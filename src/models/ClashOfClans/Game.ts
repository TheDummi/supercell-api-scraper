import { Games } from "../../main.js";
import { statusCodes } from "../Functions.js";
import * as Tools from "../Tools.js";
import Clans from "./Clans.js";
import Events from "./Events.js";
import Labels from "./labels.js";
import Leagues from "./leagues.js";
import Locations from "./Locations.js";
import Player from "./Players.js";

export default class ClashOfClans {
	options: any;
	players: any;
	clans: any;
	leagues: any;
	locations: any;
	events: any;
	labels: any;

	constructor(options: any) {
		this.options = options.ClashOfClans;

		this.players = new Player(this.options);

		this.clans = new Clans(this.options);

		this.leagues = new Leagues(this.options);

		this.locations = new Locations(this.options);

		this.events = new Events(this.options);

		this.labels = new Labels(this.options);

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
		const response = await this.#fetch("goldpass/seasons/current");
		console.log(response);
		if ((response as { startTime: number }).startTime)
			return statusCodes({ message: "" });
		else return response;
	}

	async #fetch(domain: string, options?: Record<string, string>) {
		return await Tools.fetch(
			this.options.token,
			Games.ClashOfClans,
			domain,
			options
		);
	}
}
