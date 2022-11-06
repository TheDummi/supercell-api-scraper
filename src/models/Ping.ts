import { Games } from "../data/Games.js";
import { hasAPIToken } from "./Functions.js";
import Game from "./Game.js";

export default new (class Ping {
	constructor() {
		this.all = this.all;

		this.ClashOfClans = this.ClashOfClans;

		this.ClashRoyale = this.ClashRoyale;

		this.BrawlStars = this.BrawlStars;
	}

	/**
	 * A function to measure all latencies of each game.
	 * @returns game latency.
	 */
	async all() {
		return [
			{ ClashOfClans: await this.ClashOfClans() },
			{ ClashRoyale: await this.ClashRoyale() },
			{ BrawlStars: await this.BrawlStars() },
		];
	}

	/**
	 * A function to measure the latency of Clash of Clans game.
	 * @returns game latency.
	 */
	async ClashOfClans() {
		const start = Date.now();

		await Game.fetch(Games.ClashOfClans, "leagues", {});

		return Date.now() - start;
	}

	/**
	 * A function to measure the latency of Clash Royale game.
	 * @returns game latency.
	 */
	async ClashRoyale() {
		const start = Date.now();

		await Game.fetch(Games.ClashRoyale, "cards", {});

		return Date.now() - start;
	}

	/**
	 * A function to measure the latency of Brawl Stars game.
	 * @returns game latency.
	 */
	async BrawlStars() {
		const start = Date.now();

		await Game.fetch(Games.BrawlStars, "brawlers", {});

		return Date.now() - start;
	}
})();
