import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { env } from "src/config/env";

@Injectable()
export class AuthGoogleStrategy extends PassportStrategy(Strategy, "google") {
	constructor() {
		super({
			clientID: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:3000/auth/google/callback",
			scope: ["email", "profile"],
		});
	}

	authorizationParams(): { [key: string]: string } {
        return {
            prompt: 'select_account',
        };
    }
	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: VerifyCallback,
	): Promise<any> {
		const { name, emails } = profile;
		const user = {
			email: emails[0].value,
			firstName: name.givenName,
			lastName: name.familyName,
			accessToken,
		};
		done(null, user);
	}
}
