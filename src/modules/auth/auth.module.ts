import { Module, type OnModuleInit } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { env } from "src/config/env";
import { AuthController } from "./controllers/auth.controller";
import { AccountModel } from "./models/auth.model";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
	imports: [
		JwtModule.register({
			secret: env.JWT_SECRET,
			signOptions: { expiresIn: "15m" },
		}),
		PassportModule,
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule implements OnModuleInit {
	async onModuleInit() {
		AccountModel.syncDB((err: any, result: any) => {
			if (err) throw err;
			console.log(" Account/Auth Schema synchronized: ", result);
		});
	}
}
