import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { FastifyReply } from "fastify";
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
	async login(
		@Body() loginAuthDto: LoginAuthDTO,
		@Res({ passthrough: true }) response: FastifyReply,
	) {
		const result = await this.authService.login(
			loginAuthDto.email,
			loginAuthDto.password,
		);

		response.setCookie("access_token", result.access_token, {
			httpOnly: true,
			path: "/",
			maxAge: 15 * 60 * 1000,
			sameSite: "lax",
			secure: false,
		});

		return result;
	}
}
