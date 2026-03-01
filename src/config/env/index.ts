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
	STRIPE_SECRET_KEY: z.string(),
	STRIPE_WEBHOOK_SECRET: z.string(),
});

if (process.env.NODE_ENV !== "prod") {
	const envPath = process.env.NODE_ENV === "test" ? ".env.test" : ".env.dev";
	config({ path: envPath });
} else {
	config();
}

const { error, data } = envSchema.safeParse(process.env);

if (error) {
	console.error("❌ Invalid environment variables: ", z.treeifyError(error));
	throw new Error("Invalid environment variables");
}

export const env = data;
