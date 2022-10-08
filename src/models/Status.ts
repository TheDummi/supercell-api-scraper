import { Games } from "../data/Games.js";
import { statusCodes } from "./Functions.js";
import fetch from "./Fetch.js";

export default {
	all,
	clashOfClans,
	clashRoyale,
	brawlStars,
};

export async function all() {
	return {
		clashOfClans: await clashOfClans(),
		clashRoyale: await clashRoyale(),
		brawlStars: await brawlStars(),
	};
}

export async function clashOfClans() {
	return statusCodes(await fetch(Games.ClashOfClans, "leagues", {}));
}

export async function clashRoyale() {
	return statusCodes(await fetch(Games.ClashRoyale, "cards", {}));
}

export async function brawlStars() {
	return statusCodes(await fetch(Games.BrawlStars, "brawlers", {}));
}
