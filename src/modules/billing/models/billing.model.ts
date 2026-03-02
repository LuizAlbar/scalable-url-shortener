import { models } from "src/config/database/cassandra/cassandra.client";

export const BillingModel = models.loadSchema("Billing", {
	fields: {
		id: { type: "text", key: "partitioned" },
		user_email: { type: "text" },
		active: { type: "boolean", default: false },
		created_at: {
			type: "timestamp",
			default: { $db_function: "toTimestamp(now())" },
		},
		updated_at: {
			type: "timestamp",
			default: { $db_function: "toTimestamp(now())" },
		},
	},
	key: ["id"],
	options: {
		table_name: "billings",
		model: "Billing",
		timestamp: { created_at: "created_at" },
		update_timestamp: { updated_at: "updated_at" },
	},
});
