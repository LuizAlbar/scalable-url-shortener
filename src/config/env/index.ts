import { config } from "dotenv";
import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["dev", "test", "prod"]).default("dev"),
	JWT_SECRET: z.string(),
	PORT: z.coerce.number().default(3000),
	CASSANDRA_URL: z.string(),
	REDIS_URL: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	MAIL_HOST: z.string(),
	MAIL_PORT: z.coerce.number(),
	MAIL_USER: z.string(),
	MAIL_PASS: z.string(),
});

const nodeEnv = process.env.NODE_ENV || "dev";

const envPath = nodeEnv === "prod" ? ".env.prod" : ".env.dev";

const { error, data } = envSchema.safeParse(
	config({ path: envPath, override: true, encoding: "utf-8" }).parsed,
);

if (error) {
	console.error("❌ Invalid environment variables: ", z.treeifyError(error));

	throw new Error("Invalid environment variables");
}

export const env = data;
