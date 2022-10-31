import { Games } from "../data/Games.js";
import { statusCodes } from "./Functions.js";
import fetch from "./Fetch.js";

export default new (class Status {
	async all() {
		return {
			clashOfClans: await this.clashOfClans(),
			clashRoyale: await this.clashRoyale(),
			brawlStars: await this.brawlStars(),
		};
	}

	async clashOfClans() {
		return statusCodes(await fetch(Games.ClashOfClans, "leagues", {}));
	}

	async clashRoyale() {
		return statusCodes(await fetch(Games.ClashRoyale, "cards", {}));
	}

	async brawlStars() {
		return statusCodes(await fetch(Games.BrawlStars, "brawlers", {}));
	}
})();
