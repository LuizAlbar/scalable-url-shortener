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
