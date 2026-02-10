import { Body, Controller, HttpCode, Post } from "@nestjs/common";
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
}
