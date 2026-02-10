import { Injectable } from "@nestjs/common";
import { generateIdHelper } from "src/common/generate-id";
import { models } from "src/config/database/cassandra/cassandra.client";

@Injectable()
export class UrlShortenerService {
	private readonly urlModel = models.instance.Url;
	async shortenUrl(long_url: string) {
		const shortId = generateIdHelper.generateId();

		const newUrl = new this.urlModel({
			long_url,
			short_id: shortId,
		});

		try {
			await newUrl.saveAsync();
			return shortId;
		} catch (error) {
			console.error("Couldn't save model:", error);
			throw error;
		}
	}

	async getLongUrl(shortId: string) {
		try {
			const result = await this.urlModel.findOneAsync({
				short_id: shortId,
			});
			return result.long_url;
		} catch (error) {
			console.error("Couldn't fetch long url:", error);
			throw error;
		}
	}
}
