import CoCAssets from "../data/CoC/assets.js";
import { Games } from "../data/Games.js";
import fetch from "../models/Fetch.js";

export async function validateTag(tag: string) {
	let player;
	for (const game of [
		Games.ClashOfClans,
		Games.ClashRoyale,
		Games.BrawlStars,
	]) {
		player = await fetch(game, "players", { tag });

		player.game = game;

		if (player.tag || player?.profile?.tag) break;
		else continue;
	}

	if (player.tag || player?.profile?.tag)
		return {
			name: player?.name || player?.profile?.name,
			tag: player?.tag || player?.profile?.tag,
			game: player.game,
		};
	else return player.code;
}

export async function fetchChief(tag: string) {
	let chief = await fetch(Games.ClashOfClans, "players", { tag });

	chief = cocModify(chief);

	return chief;
}

export async function fetchKing(tag: string) {
	const king = await fetch(Games.ClashRoyale, "players", { tag });

	return king;
}

export async function fetchBrawler(tag: string) {
	const user = await fetch(Games.BrawlStars, "players", { tag });

	return user;
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

		unit.limitLevel = limitLevel;

		unit.previousLevel = previousLevel;

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

	delete data.troops;
	delete data.spells;
	delete data.heroes;
	delete data.townHallLevel;
	delete data.townHallWeaponLevel;
	delete data.trophies;
	delete data.bestTrophies;
	delete data.builderHallLevel;
	delete data.versusTrophies;
	delete data.bestVersusTrophies;
	delete data.versusBattleWinCount;
	delete data.versusBattleWins;
	delete data.role;
	delete data.attackWins;
	delete data.defenseWins;
	delete data.donations;
	delete data.donationsReceived;
	delete data.tag;
	delete data.name;
	delete data.expLevel;
	delete data.warStars;
	delete data.warPreference;
	delete data.labels;
	delete data.league;
	delete data.clanCapitalContributions;

	delete data.achievements;

	return data;
}
