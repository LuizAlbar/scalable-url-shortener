import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class RegisterAuthDTO {
	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}
	@IsEmail({}, { message: "Provide a valid email" })
	@IsNotEmpty()
	@ApiProperty({
		description: "The email of the user",
		example: "johndoe@example.com",
	})
	readonly email: string;

	@IsStrongPassword({ minLength: 8 })
	@IsNotEmpty()
	@ApiProperty({
		description: "The password of the user",
		example: "Password123!",
	})
	readonly password: string;
}

export class LoginAuthDTO extends RegisterAuthDTO {}

export interface AuthJwtDTO {
	email: string;
	sub: string;
}

export class ForgotPasswordDTO {
	constructor(email: string) {
		this.email = email;
	}

	@IsEmail()
	@IsNotEmpty()
	@ApiProperty({
		description: "The email of the user",
		example: "johndoe@example.com",
	})
	email: string;
}

export class ResetPasswordDTO {
	constructor(email: string, token: string, newPassword: string) {
		this.email = email;
		this.token = token;
		this.newPassword = newPassword;
	}
	@IsEmail()
	@IsNotEmpty()
	@ApiProperty({
		description: "The email of the user",
		example: "johndoe@example.com",
	})
	email: string;

	@IsNotEmpty()
	@ApiProperty({
		description: "The reset token",
		example: "aeiou12345",
	})
	token: string;

	@IsStrongPassword({ minLength: 8 })
	@IsNotEmpty()
	@ApiProperty({
		description: "The new password",
		example: "NewPassword123!",
	})
	newPassword: string;
}
