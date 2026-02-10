import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Redirect,
} from "@nestjs/common";
import { CreateUrlDTO } from "../dtos/create-url.dto";
import { UrlShortenerService } from "../services/url-shortener.service";

@Controller("shorten-url")
export class UrlController {
	constructor(private readonly urlService: UrlShortenerService) {}

	@Post()
	@HttpCode(201)
	async shortenUrl(@Body() createUrlDto: CreateUrlDTO) {
		return this.urlService.shortenUrl(createUrlDto.longUrl);
	}

	@Get(":shortId")
	@Redirect()
	async getLongUrl(@Param("shortId") shortId: string) {
		const logUrl = await this.urlService.getLongUrl(shortId);

		return { url: logUrl, statusCode: 302 };
	}
}
