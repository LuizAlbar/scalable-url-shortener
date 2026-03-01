import fastifyCookie from "@fastify/cookie";
import { NestFactory } from "@nestjs/core";
import {
	FastifyAdapter,
	type NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import fastifyRawBody from "fastify-raw-body";
import { AppModule } from "./app.module";
import { env } from "./config/env";

async function bootstrap() {
	const adapter = new FastifyAdapter();
	await adapter.register(fastifyRawBody as any, {
		field: "rawBody",
		encoding: null,
		globals: false,
		routes: ["/api/v1/billing/webhook"],
	});
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		adapter,
	);
	app
		.getHttpAdapter()
		.getInstance()
		.addHook("onRequest", (req, res, next) => {
			const reply = res as any;

			if (!reply.setHeader) {
				reply.setHeader = (name: string, value: any) => {
					reply.header(name, value);
					return reply;
				};
			}

			if (!reply.end) {
				reply.end = (payload: any) => {
					reply.send(payload);
				};
			}

			next();
		});
	app.setGlobalPrefix("api/v1");

	await app.register(fastifyCookie, {
		secret: env.JWT_SECRET,
	});

	const config = new DocumentBuilder()
		.setTitle("Scalable URL Shortener")
		.setDescription("API documentation")
		.setVersion("1.0")
		.addBearerAuth()
		.addCookieAuth("access_token")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api/docs", app, document);
	await app.listen(3000, "0.0.0.0");
	console.log(`Swagger docs at: http://localhost:3000/api/docs`);
}

bootstrap();
