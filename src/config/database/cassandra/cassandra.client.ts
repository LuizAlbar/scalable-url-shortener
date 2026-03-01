import * as ExpressCassandra from "express-cassandra";
import { env } from "src/config/env";

export const models = ExpressCassandra.createClient({
	clientOptions: {
		contactPoints: [env.CASSANDRA_URL],
		localDataCenter: "DC1",
		protocolOptions: {
			port: 9042,
		},
		keyspace: "url_shortener",
		queryOptions: { consistency: ExpressCassandra.consistencies.one },
	},
	ormOptions: {
		defaultReplicationStrategy: {
			class: "SimpleStrategy",
			replication_factor: 2,
		},
		migration: "safe",
		dropTablesOnSchemaChange: true,
		createKeyspace: true,
		refreshSchema: true,
	},
});
