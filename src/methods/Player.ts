import Collection from "../data/Collection.js";
import { Games } from "../data/Games.js";
import fetch from "../models/Fetch.js";

export function fetchPlayer(tag: string, game: Games) {}

export async function fetchChief(tag: string) {
	const user = await fetch(Games.ClashOfClans, "players", {
		tag: "#Y99CCLC0R",
	});
	return console.log(user);
}

export function fetchKing(tag: string) {}

export function fetchBrawler(tag: string) {}
