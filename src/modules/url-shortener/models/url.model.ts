import { models } from "src/config/database/cassandra/cassandra.client";

export const UrlModel = models.loadSchema("Url", {
	fields: {
		short_id: { type: "text", key: "partitioned" },
		long_url: { type: "text" },
		created_at: {
			type: "timestamp",
			default: { $db_function: "toTimestamp(now())" },
		},
	},
	key: ["short_id"],
	options: {
		table_name: "urls",
		model: "Url",
		timestamp: { created_at: "created_at" },
	},
});

