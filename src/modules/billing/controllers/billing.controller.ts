import {
	BadRequestException,
	Controller,
	Get,
	Headers,
	HttpCode,
	Post,
	Req,
	Res,
	UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { BillingService } from "../services/billing.service";
import { StripeService } from "../services/stripe.service";

@Controller("billing")
export class BillingController {
	constructor(
		private stripeService: StripeService,
		private billingService: BillingService,
	) {}

	@Post("checkout")
	@UseGuards(JwtAuthGuard)
	async checkout(@Req() req: any) {
		const session = await this.stripeService.createCheckoutSession(
			req.user.email,
			req.user.sub,
		);

		return { url: session.url };
	}

	@Post("webhook")
	@HttpCode(200)
	async handleStripeWebhook(
		@Req() req: any,
		@Headers("stripe-signature") signature: string,
	) {
		if (!signature) throw new BadRequestException("Missing stripe signature");

		try {
			const event = this.stripeService.verifyWebhook(req.rawBody, signature);

			if (event.type === "checkout.session.completed") {
				const session = event.data.object as any;
				const accountId = session.client_reference_id;

				const customerEmail = event.data.object.customer_email;

				if (customerEmail) {
					await this.billingService.activeUserPlan(customerEmail);
				}

				console.log("Payment completed for account:", accountId);
			}

			return { received: true };
		} catch {
			throw new BadRequestException("Webhook verification failed");
		}
	}

	@Get("success")
	async success(@Res() res: any) {
		return res.send("<h1>Payment successfully made!</h1>");
	}

	@Get("cancel")
	async cancel(@Res() res: any) {
		return res.send("<h1>Payment cancelled!</h1>");
	}
}
