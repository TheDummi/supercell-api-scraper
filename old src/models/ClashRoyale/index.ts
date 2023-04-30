import { Games } from "../../data/Games.js";
import { statusCodes } from "../Functions.js";
import * as Tools from "../Tools.js";

export default class ClashRoyale {
	options: any;
	clans: any;
	players: any;
	cards: any;
	tournaments: any;
	locations: any;
	challenges: any;

	constructor(options: any) {
		this.options = options.ClashRoyale || null;

		this.clans = {};

		this.players = {};

		this.cards = {};

		this.tournaments = {};

		this.locations = {};

		this.challenges = {};

		this.ping = this.ping;

		this.status = this.status;

		return this;
	}

	async ping() {
		const start = await Date.now();

		await this.#fetch("ping");

		return (await Date.now()) - start;
	}

	async status() {
		const response = await this.#fetch("locations");

		if ((response as { items: string }).items)
			return statusCodes({ message: "" });
		else return response;
	}

	async #fetch(domain: string, options?: Record<string, string>) {
		if (!this.options?.token)
			throw new Error(
				`To use this method for Clash Royale you are required to have a valid token.`
			);

		return await Tools.fetch(
			this.options.token,
			Games.ClashRoyale,
			domain,
			options
		);
	}
}
