import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { FastifyRequest } from "fastify";
import { Strategy } from "passport-jwt";
import { env } from "src/config/env";
import { AuthJwtDTO } from "../dtos/auth-dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: (req: FastifyRequest) => {
				return req?.cookies?.access_token || null;
			},
			ignoreExpiration: false,
			secretOrKey: env.JWT_SECRET,
		});
	}

	async validate(payload: AuthJwtDTO) {
		return { email: payload.email, sub: payload.sub };
	}
}
