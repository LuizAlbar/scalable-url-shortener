import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { hashPasswordService } from "src/common/hash-password-service";
import { models } from "src/config/database/cassandra/cassandra.client";
import { uuidv7 } from "uuidv7";
import { AuthJwtDTO } from "../dtos/auth-dto";

@Injectable()
export class AuthService {
	private readonly authModel = models.instance.Account;
	constructor(private jwtService: JwtService) {}

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
}
