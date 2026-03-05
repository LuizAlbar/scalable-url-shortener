import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { generateIdHelper } from "src/common/generate-id";
import { hashPasswordService } from "src/common/hash-password-service";
import { MailService } from "src/common/mail-service";
import { models } from "src/config/database/cassandra/cassandra.client";
import { uuidv7 } from "uuidv7";
import { AuthJwtDTO } from "../dtos/auth-dto";

@Injectable()
export class AuthService {
	private readonly authModel = models.instance.Account;
	constructor(
		private jwtService: JwtService,
		private mailService: MailService,
	) {}

	async register(email: string, password: string) {
		const hashedPassword = await hashPasswordService.hashPassword(password);

		const newAccount = new this.authModel({
			id: uuidv7(),
			email: email,
			password: hashedPassword,
		});

		try {
			await newAccount.saveAsync();
			return newAccount;
		} catch (error) {
			console.error("Couldn't save account:", error);
			throw error;
		}
	}

	async login(email: string, password: string) {
		try {
			const account = await this.authModel.findOneAsync({
				email: email,
			});
			if (!account) {
				throw Error("Account not found");
			}

			const isPasswordValid = await hashPasswordService.comparePassword(
				password,
				account.password,
			);

			if (!isPasswordValid) {
				throw Error("Invalid password");
			}

			const payload: AuthJwtDTO = { sub: account.id, email: account.email };
			return {
				access_token: await this.jwtService.signAsync(payload),
			};
		} catch (error) {
			console.error("Couldn't find account:", error);
			throw error;
		}
	}

	async loginWithGoogle(email: string) {
		try {
			let account = await this.authModel.findOneAsync({
				email: email,
			});

			if (!account) {
				account = new this.authModel({
					id: uuidv7(),
					email: email,
					password: null,
				});
				await account.saveAsync();
			}

			const payload: AuthJwtDTO = { sub: account.id, email: account.email };

			return {
				access_token: await this.jwtService.signAsync(payload),
			};
		} catch {}
	}

	async forgotPassword(email: string) {
		const account = await this.authModel.findOneAsync({
			email: email,
		});

		if (!account) {
			throw Error("Account not found");
		}

		if (account.reset_token || account.reset_token_expires) {
			account.reset_token = null;
			account.reset_token_expires = null;
		}

		const token = generateIdHelper.generateId().toUpperCase();
		const expires = new Date();
		expires.setHours(expires.getMinutes() + 15);

		account.reset_token = token;
		account.reset_token_expires = expires;

		await account.saveAsync();

		await this.mailService.sendResetPasswordEmail(email, token);

		return {
			message:
				"If an account with that email exists, a reset link has been sent.",
		};
	}

	async resetPassword(email: string, token: string, newPassword: string) {
		const account = await this.authModel.findOneAsync({
			email: email,
		});

		if (!account || account.reset_token_expires < new Date()) {
			throw new Error("Invalid or expired token");
		}

		if (account.reset_token !== token) {
			throw new Error("Invalid token");
		}

		account.password = await hashPasswordService.hashPassword(newPassword);
		account.reset_token = null;
		account.reset_token_expires = null;

		await account.saveAsync();

		return { message: "Password has been reset successfully" };
	}
}
