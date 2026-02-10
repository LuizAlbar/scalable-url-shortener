import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UrlShortenerModule } from "./modules/url-shortener/url-shortener.module";

@Module({
	imports: [
		UrlShortenerModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
