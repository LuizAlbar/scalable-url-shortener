import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) {}

	async sendResetPasswordEmail(email: string, resetToken: string) {
		await this.mailerService.sendMail({
			to: email,
			subject: "Reset Password",
			template: "./reset-password.hbs",
			context: {
				resetToken,
			},
		});
	}
}
