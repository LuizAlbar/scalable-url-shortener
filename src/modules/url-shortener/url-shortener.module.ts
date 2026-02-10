import { Module, type OnModuleInit } from "@nestjs/common";
import { UrlController } from "./controllers/url-shortener.controller";
import { UrlModel } from "./models/url.model";
import { UrlShortenerService } from "./services/url-shortener.service";

@Module({
	imports: [],
	controllers: [UrlController],
	providers: [UrlShortenerService],
})
export class UrlShortenerModule implements OnModuleInit {
	async onModuleInit() {
		UrlModel.syncDB((err: any, result: any) => {
			if (err) throw err;
			console.log("Schema synchronized: ", result);
		});
	}
}
