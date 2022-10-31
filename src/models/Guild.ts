import { Games } from "../data/Games.js";
import fetch from "./Fetch.js";

export default {
	findAll,
	getClashOfClansClan,
	getClashRoyaleClan,
	getBrawlStarsClub,
};

export async function findAll(tag: string) {
	const guilds: object[] = [];

	for (const game of [
		Games.ClashOfClans,
		Games.ClashRoyale,
		Games.BrawlStars,
	]) {
		const guild = await fetch(game, game == "BrawlStars" ? "clubs" : "clans", {
			tag,
		});

		if (guild.tag || guild?.profile?.tag)
			guilds.push({
				name: guild?.name || guild?.profile?.name,
				tag: guild?.tag || guild?.profile?.tag,
				game: game,
			});
		else continue;
	}

	if (guilds.length > 0) return guilds;
	else return "No guilds found with tag " + tag;
}

export async function getClashOfClansClan(tag: string) {}
export async function getClashRoyaleClan(tag: string) {}
export async function getBrawlStarsClub(tag: string) {}
