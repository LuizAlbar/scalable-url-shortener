import { Module, OnModuleInit } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BillingController } from "./controllers/billing.controller";
import { BillingModel } from "./models/billing.model";
import { StripeService } from "./services/stripe.service";

@Module({
	imports: [AuthModule],
	controllers: [BillingController],
	providers: [StripeService],
})
export class BillingModule implements OnModuleInit {
	async onModuleInit() {
		BillingModel.syncDB((err: any, result: any) => {
			if (err) throw err;
			console.log("Billing Schema synchronized: ", result);
		});
	}
}
