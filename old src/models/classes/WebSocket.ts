import { FormattedGames } from "../../data/Games.js";
import BrawlStars from "../BrawlStars/index.js";
import ClashOfClans from "../ClashOfClans/index.js";
import ClashRoyale from "../ClashRoyale/index.js";

interface Client {
	ClashOfClans: typeof ClashOfClans;
	ClashRoyale: typeof ClashRoyale;
	BrawlStars: typeof BrawlStars;
}

export default class WebSocket {
	#client: Client;

	constructor(client: any) {
		this.#client = client;

		this.ping = this.ping;

		this.status = this.status;

		return this;
	}

	async ping(game?: FormattedGames) {
		let coc = null,
			cr = null,
			bs = null;

		try {
			coc = await (
				this.#client.ClashOfClans as unknown as Record<string, Function>
			).ping();
		} catch {}
		try {
			cr = await (
				this.#client.ClashRoyale as unknown as Record<string, Function>
			).ping();
		} catch {}
		try {
			bs = await (
				this.#client.BrawlStars as unknown as Record<string, Function>
			).ping();
		} catch {}
		const ping = {
			"Clash of Clans": coc,
			"Clash Royale": cr,
			"Brawl Stars": bs,
		};

		if (game) return ping[game];
		else return ping;
	}

	async status(game?: FormattedGames) {
		let coc = null,
			cr = null,
			bs = null;

		try {
			coc = await (
				this.#client.ClashOfClans as unknown as Record<string, Function>
			).status();
		} catch {}
		try {
			cr = await (
				this.#client.ClashRoyale as unknown as Record<string, Function>
			).status();
		} catch {}
		try {
			bs = await (
				this.#client.BrawlStars as unknown as Record<string, Function>
			).status();
		} catch {}
		const status = {
			"Clash of Clans": coc,
			"Clash Royale": cr,
			"Brawl Stars": bs,
		};

		if (game) return status[game];
		else return status;
	}
}
