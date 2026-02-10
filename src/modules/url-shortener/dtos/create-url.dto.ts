import { IsNotEmpty, IsUrl } from "class-validator";

export class CreateUrlDTO {
	constructor(longUrl: string) {
		this.longUrl = longUrl;
	}
	@IsUrl({}, { message: "Provide a valid url" })
	@IsNotEmpty()
	readonly longUrl: string;
}
