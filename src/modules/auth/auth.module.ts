import { Module, type OnModuleInit } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { MailService } from "src/common/mail-service";
import { env } from "src/config/env";
import { AuthController } from "./controllers/auth.controller";
import { AccountModel } from "./models/auth.model";
import { AuthService } from "./services/auth.service";
import { AuthGoogleStrategy } from "./strategies/auth-google.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
	imports: [
		JwtModule.register({
			secret: env.JWT_SECRET,
			signOptions: { expiresIn: "15m" },
		}),
		PassportModule.register({ session: false }),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, AuthGoogleStrategy, MailService],
})
export class AuthModule implements OnModuleInit {
	async onModuleInit() {
		AccountModel.syncDB((err: any, result: any) => {
			if (err) throw err;
			console.log(" Account/Auth Schema synchronized: ", result);
		});
	}
}
