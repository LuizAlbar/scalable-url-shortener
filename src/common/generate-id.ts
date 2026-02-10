import { customAlphabet } from "nanoid";

class GenerateIdHelper {
	constructor() {
		this.alphabet;
		this.idGenerator;
	}

	private alphabet =
		"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	private idGenerator = customAlphabet(this.alphabet, 7);

	generateId(): string {
		return this.idGenerator();
	}
}

export const generateIdHelper = new GenerateIdHelper();
