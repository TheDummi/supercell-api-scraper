import CoCAssets from "../data/CoC/assets.js";
import { Games } from "../data/Games.js";
import fetch from "./Fetch.js";

export default {
	findAll,
	fetchChief,
	fetchKing,
	fetchBrawler,
};

/**
 *
 * @param {string} tag - An account tag of any game.
 * @description will find the game the tag is from.
 * @returns name, tag and game tag is validated on.
 */
export async function findAll(tag: string) {
	const players: object[] = [];

	for (const game of [
		Games.ClashOfClans,
		Games.ClashRoyale,
		Games.BrawlStars,
	]) {
		const player = await fetch(game, "players", {
			tag,
		});

		if (player.tag || player?.profile?.tag)
			players.push({
				name: player?.name || player?.profile?.name,
				tag: player?.tag || player?.profile?.tag,
				game: game,
			});
		else continue;
	}

	if (players.length > 0) return players;
	else return "No players found with tag " + tag;
}

/**
 *
 * @param {string} tag - An account tag of any game.
 * @returns info on the tag
 */
export async function fetchChief(tag: string) {
	let chief = await fetch(Games.ClashOfClans, "players", { tag });

	chief = cocModify(chief);

	return chief;
}

/**
 *
 * @param {string} tag - An account tag of any game.
 * @returns info on the tag
 */
export async function fetchKing(tag: string) {
	let king = await fetch(Games.ClashRoyale, "players", { tag });

	king = crModify(king);

	return king;
}

/**
 *
 * @param {string} tag - An account tag of any game.
 * @returns info on the tag
 */
export async function fetchBrawler(tag: string) {
	let brawler = await fetch(Games.BrawlStars, "players", { tag });

	brawler = bsModify(brawler);

	return brawler;
}

function cocModify(data: any) {
	const types: string[] = [],
		units: object[] = [];

	if (data.troops) types.push("troops");
	if (data.spells) types.push("spells");
	if (data.heroes) types.push("heroes");

	types.map((type) => units.push(...data[type]));

	units.map((unit: any) => {
		const foundUnit: any = CoCAssets.find(
			(asset) => asset.name === unit.name && asset.village === unit.village
		);

		const limitLevel: number =
			foundUnit?.levels[
				foundUnit?.village === "home"
					? "th" + data.townHallLevel
					: "bh" + data.builderHallLevel
			];

		const previousLevel: number =
			foundUnit?.levels[
				foundUnit?.village === "home"
					? "th" + (data.townHallLevel - 1)
					: "bh" + (data.builderHallLevel - 1)
			];

		unit.limitLevel = limitLevel || 0;

		unit.previousLevel = previousLevel || 0;

		unit.state =
			unit.level == unit.maxLevel
				? "Game Max"
				: unit.level == limitLevel
				? "Current Max"
				: unit.level < previousLevel
				? "Rushed"
				: "Pending";

		unit.type = foundUnit.type;

		unit.progress = `${
			Math.round((unit.level / limitLevel) * 10000) / 100 || 100
		}%`;
	});

	data.profile = {
		tag: data.tag,
		name: data.name,
		level: data.expLevel,
		warStars: data.warStars,
		warPreference: data.warPreference,
		clanCapitalContributions: data?.clanCapitalContributions || 0,
		labels: data.labels,
	};

	data.homeVillage = {
		hallLevel: data.townHallLevel,
		hallWeapon: data?.townHallWeaponLevel || 0,
		trophies: data.trophies || 0,
		record: data.bestTrophies || 0,
		league: data?.league,
	};

	data.builderBase = {
		hallLevel: data?.builderHallLevel || 0,
		trophies: data?.versusTrophies || 0,
		record: data?.bestVersusTrophies || 0,
		wins: data?.versusBattleWinCount || 0,
	};

	data.currentSeason = {
		attackWins: data?.attackWins || 0,
		defenseWins: data?.defenseWins || 0,
		donations: data?.donations || 0,
		donationsReceived: data?.donationsReceived || 0,
	};

	data.units = units;

	data.clan.role =
		data.role == "leader"
			? "Leader"
			: data.role == "coLeader"
			? "Co-Leader"
			: data.role == "admin"
			? "Elder"
			: "Member";

	data.clan.warPreference = data.warPreference;

	[
		"troops",
		"spells",
		"heroes",
		"townHallLevel",
		"townHallWeaponLevel",
		"trophies",
		"bestTrophies",
		"builderHallLevel",
		"versusTrophies",
		"bestVersusTrophies",
		"versusBattleWinCount",
		"versusBattleWins",
		"role",
		"attackWins",
		"defenseWins",
		"donations",
		"donationsReceived",
		"tag",
		"name",
		"expLevel",
		"warStars",
		"warPreference",
		"labels",
		"league",
		"clanCapitalContributions",
	].map((i) => delete data[i]);

	return data;
}

function crModify(data: any) {
	const units: object[] = [];

	data.profile = {
		tag: data.tag,
		name: data.name,
		level: data.expLevel,
		xp: data.expPoints,
		trophies: data.trophies,
		record: data.bestTrophies,
		wins: data.wins,
		losses: data.losses,
		battles: data.battleCount,
		triples: data.threeCrownWins,
		starPoints: data.starPoints,
		yearsPlayed:
			data.badges.find((b: any) => b.name === "YearsPlayed")?.level || 0,
		challenge: {
			cards: data.challengeCardsWon,
			streak: data.challengeMaxWins,
		},
		tournament: {
			cards: data.tournamentCardsWon,
			battles: data.tournamentBattleCount,
		},
		clan: {
			donations: data.totalDonations,
			warWins: data.warDayWins,
			cards: data.clanCardsCollected,
		},
	};

	data.currentSeason = {
		donations: data.donations,
		donationsReceived: data.donationsReceived,
	};

	data.clan.role = data.role;

	data.cards.map(
		(card: { progress: string; level: number; maxLevel: number }) => {
			card.progress = `${
				Math.round((card.level / card.maxLevel) * 10000) / 100
			}%`;

			units.push(card);
		}
	);

	data.units = units;

	[
		"tag",
		"name",
		"expLevel",
		"trophies",
		"bestTrophies",
		"wins",
		"losses",
		"battleCount",
		"threeCrownWins",
		"challengeCardsWon",
		"challengeMaxWins",
		"tournamentCardsWon",
		"tournamentBattleCount",
		"role",
		"donations",
		"donationsReceived",
		"totalDonations",
		"warDayWins",
		"clanCardsCollected",
		"cards",
		"starPoints",
		"expPoints",
	].map((i) => delete data[i]);

	return data;
}

function bsModify(data: any) {
	data.profile = {};

	Object.entries(data).map(([key, value]) => {
		if (!["club", "brawlers", "profile"].includes(key)) {
			data.profile[key] = value;

			delete data[key];
		}
	});

	return data;
}
