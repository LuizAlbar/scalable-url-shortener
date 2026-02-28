import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { hashPasswordService } from "src/common/hash-password-service";
import { models } from "src/config/database/cassandra/cassandra.client";
import { AuthJwtDTO } from "../dtos/auth-dto";

@Injectable()
export class AuthService {
	private readonly authModel = models.instance.Account;
	constructor(private jwtService: JwtService) {}

	async register(email: string, password: string) {
		const hashedPassword = hashPasswordService.hashPassword(password);

		const newAccount = new this.authModel({
			email,
			hashedPassword,
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

			const isPasswordValid = await hashPasswordService.comparePassword(
				password,
				account.hashedPassword,
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
}
