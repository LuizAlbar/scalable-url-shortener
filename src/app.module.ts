import { join } from "node:path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { env } from "./config/env";
import { AuthModule } from "./modules/auth/auth.module";
import { UrlShortenerModule } from "./modules/url-shortener/url-shortener.module";

@Module({
	imports: [
		UrlShortenerModule,
		AuthModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MailerModule.forRoot({
			transport: {
				host: env.MAIL_HOST,
				port: env.MAIL_PORT,
				secure: false,
				auth: {
					user: env.MAIL_USER,
					pass: env.MAIL_PASS,
				},
			},
			defaults: {
				from: '"Scalable Shortener <noreply@scalableshortener.com>"',
			},
			template: {
				dir: join(__dirname, "common"),
				adapter: new HandlebarsAdapter(),
				options: {
					strict: true,
				},
			},
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
