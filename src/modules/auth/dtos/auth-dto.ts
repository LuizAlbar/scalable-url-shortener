import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class RegisterAuthDTO {
	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}
	@IsEmail({}, { message: "Provide a valid email" })
	@IsNotEmpty()
	readonly email: string;

	@IsStrongPassword({ minLength: 8 })
	@IsNotEmpty()
	readonly password: string;
}

export class LoginAuthDTO extends RegisterAuthDTO {}

export interface AuthJwtDTO {
	email: string;
	sub: string;
}
