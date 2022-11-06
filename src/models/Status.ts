import { Games } from "../data/Games.js";
import { statusCodes } from "./Functions.js";
import Game from "./Game.js";

export default new (class Status {
	constructor() {
		this.all = this.all;

		this.ClashOfClans = this.ClashOfClans;

		this.ClashRoyale = this.ClashRoyale;

		this.BrawlStars = this.BrawlStars;
	}

	/**
	 * A function to check the status of all games.
	 * @returns game status.
	 */
	async all() {
		return {
			ClashOfClans: await this.ClashOfClans(),
			ClashRoyale: await this.ClashRoyale(),
			BrawlStars: await this.BrawlStars(),
		};
	}

	/**
	 * A function to check the status of Clash of Clans.
	 * @returns game status.
	 */
	async ClashOfClans(): Promise<{
		online: boolean;
		code: number;
		info: string;
	}> {
		const state = await Game.fetch(Games.ClashOfClans, "leagues", {});

		if (state.online === false) return state;
		else return statusCodes(state);
	}

	/**
	 * A function to check the status of Clash Royale.
	 * @returns game status.
	 */
	async ClashRoyale(): Promise<{
		online: boolean;
		code: number;
		info: string;
	}> {
		const state = await Game.fetch(Games.ClashRoyale, "cards", {});

		if (state.online === false) return state;
		else return statusCodes(state);
	}

	/**
	 * A function to check the status of Brawl Stars.
	 * @returns game status.
	 */
	async BrawlStars(): Promise<{ online: boolean; code: number; info: string }> {
		const state = await Game.fetch(Games.BrawlStars, "brawlers", {});

		if (state.online === false) return state;

		return statusCodes(state);
	}
})();
