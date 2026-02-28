import { models } from "src/config/database/cassandra/cassandra.client";

export const AccountModel = models.loadSchema("Account", {
	fields: {
		id: { type: "text", key: "partitioned" },
		email: { type: "text" },
		passoword: { type: "text" },
		created_at: {
			type: "timestamp",
			default: { $db_function: "toTimestamp(now())" },
		},
	},
	key: ["id"],
	options: {
		table_name: "accounts",
		model: "Account",
		timestamp: { created_at: "created_at" },
	},
});
