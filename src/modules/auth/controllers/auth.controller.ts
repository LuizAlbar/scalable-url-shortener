import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Req,
	Res,
	UseGuards,
} from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import {
	ForgotPasswordDTO,
	LoginAuthDTO,
	RegisterAuthDTO,
	ResetPasswordDTO,
} from "../dtos/auth-dto";
import { AuthGoogleGuard } from "../guards/auth-google.guard";
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

	@Get("google")
	@UseGuards(AuthGoogleGuard)
	async googleAuth(@Req() req: FastifyRequest) {}

	@Get("google/callback")
	@UseGuards(AuthGoogleGuard)
	async googleAuthRedirect(
		@Req() req: FastifyRequest,
		@Res() res: FastifyReply,
	) {
		const result = await this.authService.loginWithGoogle(req?.user.email);

		if (!result) {
			return res.status(401).send("Unauthorized");
		}

		res.setCookie("access_token", result?.access_token, {
			httpOnly: true,
			path: "/",
			maxAge: 15 * 60 * 1000,
			sameSite: "lax",
			secure: false,
		});
		return res
			.status(302)
			.redirect(
				`http://localhost:5173/auth/google/callback?token=${result?.access_token}&name=${req?.user.firstName}`,
			);
	}

	@Post("forgot-password")
	@HttpCode(200)
	async forgotPassword(@Body() { email }: ForgotPasswordDTO) {
		return this.authService.forgotPassword(email);
	}

	@Post("reset-password")
	@HttpCode(200)
	async resetPassword(@Body() { email, token, newPassword }: ResetPasswordDTO) {
		return this.authService.resetPassword(email, token, newPassword);
	}
}
