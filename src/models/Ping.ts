import { Games } from "../data/Games.js";
import fetch from "./Fetch.js";
export default {
	clashOfClans,
	clashRoyale,
	brawlStars,
};

async function clashOfClans() {
	const start = Date.now();

	await fetch(Games.ClashOfClans, "leagues", {});

	return Date.now() - start;
}

async function clashRoyale() {
	const start = Date.now();

	await fetch(Games.ClashRoyale, "cards", {});

	return Date.now() - start;
}

async function brawlStars() {
	const start = Date.now();

	await fetch(Games.BrawlStars, "brawlers", {});

	return Date.now() - start;
}
