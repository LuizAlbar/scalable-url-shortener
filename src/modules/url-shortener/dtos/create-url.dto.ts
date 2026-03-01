import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";

export class CreateUrlDTO {
	constructor(longUrl: string) {
		this.longUrl = longUrl;
	}
	@IsUrl({}, { message: "Provide a valid url" })
	@ApiProperty({
		description: "The long url you want to shorten",
		example: "https://google.com",
	})
	@IsNotEmpty()
	readonly longUrl: string;
}
