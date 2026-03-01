import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { UrlShortenerModule } from "./modules/url-shortener/url-shortener.module";

@Module({
	imports: [
		UrlShortenerModule,
		AuthModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
