import { Games } from "../data/Games.js";
import fetch from "./Fetch.js";

export default new (class Ping {
	async all() {
		return [
			{ ClashOfClans: await this.ClashOfClans() },
			{ ClashRoyale: await this.ClashRoyale() },
			{ BrawlStars: await this.BrawlStars() },
		];
	}

	async ClashOfClans() {
		const start = Date.now();

		await fetch(Games.ClashOfClans, "leagues", {});

		return Date.now() - start;
	}

	async ClashRoyale() {
		const start = Date.now();

		await fetch(Games.ClashRoyale, "cards", {});

		return Date.now() - start;
	}

	async BrawlStars() {
		const start = Date.now();

		await fetch(Games.BrawlStars, "brawlers", {});

		return Date.now() - start;
	}
})();
