import { Injectable } from "@nestjs/common";
import { env } from "src/config/env";
import Stripe from "stripe";

@Injectable()
export class StripeService {
	private stripe: Stripe;

	constructor() {
		this.stripe = new Stripe(env.STRIPE_SECRET_KEY, {
			apiVersion: "2026-02-25.clover",
		});
	}

	async createCheckoutSession(userEmail: string, accountId: string) {
		return this.stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "subscription",
			line_items: [{ price: "price_1T6F3p3hWXhpqAN0c5Wxy9Cz", quantity: 1 }],
			customer_email: userEmail,
			client_reference_id: accountId,
			success_url: `http://localhost:3000/api/v1/billing/success`,
			cancel_url: `http://localhost:3000/api/v1/billing/cancel`,
		});
	}

	verifyWebhook(rawBody: Buffer, signature: string) {
		return this.stripe.webhooks.constructEvent(
			rawBody,
			signature,
			env.STRIPE_WEBHOOK_SECRET,
		);
	}
}
