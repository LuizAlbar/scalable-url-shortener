import { Injectable } from "@nestjs/common";
import { generateIdHelper } from "src/common/generate-id";
import { models } from "src/config/database/cassandra/cassandra.client";
import { redis } from "src/config/database/redis/redis.client";

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
			const cachedUrl = await redis.get(shortId);

			if (cachedUrl) {
				await redis.expire(shortId, 120);
				return cachedUrl;
			}

			const result = await this.urlModel.findOneAsync({
				short_id: shortId,
			});

			if (result) {
				await redis.setex(shortId, 600, result.long_url);
				return result.long_url;
			}

			return null;
		} catch (error) {
			console.error("Couldn't fetch long url:", error);
			throw error;
		}
	}
}
