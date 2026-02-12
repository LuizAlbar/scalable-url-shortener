import { config } from "dotenv";
import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["dev", "test", "prod"]).default("dev"),
	JWT_SECRET: z.string(),
	PORT: z.coerce.number().default(3000),
	CASSANDRA_URL: z.string(),
	REDIS_URL: z.string(),
});

let _env: any;

if (process.env.NODE_ENV === "dev") {
	_env = envSchema.safeParse(config({ path: ".env.dev" }));
} else if (process.env.NODE_ENV === "prod") {
	_env = envSchema.safeParse(config({ path: ".env.prod" }));
}

if (_env.success === false) {
	console.error(
		"❌ Invalid environment variables: ",
		z.treeifyError(_env.error),
	);

	throw new Error("Invalid environment variables");
}

export const env = _env.data;
