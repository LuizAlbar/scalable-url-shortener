import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { LoginAuthDTO, RegisterAuthDTO } from "../dtos/auth-dto";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("register")
	@HttpCode(201)
	async register(@Body() createAuthDto: RegisterAuthDTO) {
		return this.authService.register(
			createAuthDto.email,
			createAuthDto.password,
		);
	}

	@Post("login")
	@HttpCode(200)
	async login(@Body() loginAuthDto: LoginAuthDTO) {
		const result = await this.authService.login(
			loginAuthDto.email,
			loginAuthDto.password,
		);

		return result;
	}
}
