import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Redirect,
	UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { CreateUrlDTO } from "../dtos/create-url.dto";
import { UrlShortenerService } from "../services/url-shortener.service";

@Controller()
export class UrlController {
	constructor(private readonly urlService: UrlShortenerService) {}

	@UseGuards(JwtAuthGuard)
	@Post("shorten-url")
	@HttpCode(201)
	async shortenUrl(@Body() createUrlDto: CreateUrlDTO) {
		return this.urlService.shortenUrl(createUrlDto.longUrl);
	}

	@UseGuards(JwtAuthGuard)
	@Get(":shortId")
	@Redirect()
	async getLongUrl(@Param("shortId") shortId: string) {
		const logUrl = await this.urlService.getLongUrl(shortId);

		return { url: logUrl, statusCode: 302 };
	}
}
