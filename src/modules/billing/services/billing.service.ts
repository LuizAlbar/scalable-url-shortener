import { Injectable } from "@nestjs/common";
import { models } from "src/config/database/cassandra/cassandra.client";
import { uuidv7 } from "uuidv7";

@Injectable()
export class BillingService {
	private readonly billingModel = models.instance.Billing;

	async activeUserPlan(userEmail: string) {
		const billing = await this.billingModel.findOneAsync({
			user_email: userEmail,
		});

		if (billing) {
			billing.active = true;
			return billing;
		}

		const newBilling = new this.billingModel({
			id: uuidv7(),
			user_email: userEmail,
			active: true,
		});

		await newBilling.saveAsync();
		return newBilling;
	}

	async cancelUserPlan(userEmail: string) {
		const billing = await this.billingModel.findOneAsync({
			user_email: userEmail,
		});

		if (billing) {
			billing.active = false;
			return billing;
		}

		return null;
	}
}
