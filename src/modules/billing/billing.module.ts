import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BillingController } from "./controllers/billing.controller";
import { StripeService } from "./services/stripe.service";

@Module({
	imports: [AuthModule],
	controllers: [BillingController],
	providers: [StripeService],
})
export class BillingModule {}
