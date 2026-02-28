import { compare, hash } from "bcryptjs";

export class HashPasswordService {
	async hashPassword(password: string): Promise<string> {
		return await hash(password, 4);
	}

	async comparePassword(
		password: string,
		hashedPassword: string,
	): Promise<boolean> {
		return await compare(password, hashedPassword);
	}
}

export const hashPasswordService = new HashPasswordService();
