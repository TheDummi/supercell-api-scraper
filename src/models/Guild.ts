import { Games } from "../data/Games.js";
import {
	BrawlStarsClubData,
	BrawlStarsModifiedClubData,
	ClashOfClansClanData,
	ClashOfClansModifiedClanData,
} from "../interfaces/Modifications.js";
import { hasAPIToken } from "./Functions.js";
import Game from "./Game.js";
import Util from "./Util.js";

/**
 * The Class constructor for anything to do with a Guild.
 */
export default new (class Guild {
	constructor() {
		this.find = this.find;

		this.fetch = this.fetch;
	}
	/**
	 * A function to get figure out which games have this tag for their clan or club.
	 * @param {string} tag - A string of a clan or club.
	 * @returns An array with object data.
	 */
	async find(tag: string) {
		const guilds: object[] = [];

		for (const game of [
			Games.ClashOfClans,
			Games.ClashRoyale,
			Games.BrawlStars,
		]) {
			const guild = await Game.fetch(
				game,
				game == "BrawlStars" ? "clubs" : "clans",
				{
					tag,
				}
			);

			if (guild.tag || guild?.profile?.tag)
				guilds.push({
					name: guild?.name || guild?.profile?.name,
					tag: guild?.tag || guild?.profile?.tag,
					game: game,
					formattedGame: Util.formatGame(game),
				});
			else continue;
		}

		if (guilds.length > 0) return guilds;
		else return "No guilds found with tag " + tag;
	}

	async fetch(tag: string, game: Games, raw: boolean = false) {
		const guild = await Game.fetch(
			game,
			game === Games.BrawlStars ? "clubs" : "clans",
			{ tag }
		);

		if (!guild.tag)
			return `Couldn't find clan or club with tag ${tag.toUpperCase()}`;

		if (game === Games.ClashOfClans && !raw)
			return this.#ClashOfClansModify(guild);
		else if (game === Games.ClashRoyale && !raw)
			return this.#ClashRoyaleModify(guild);
		else if (game === Games.BrawlStars && !raw)
			return this.#BrawlStarsModify(guild);
		else return guild;
	}

	#ClashOfClansModify(info: ClashOfClansClanData) {
		const profile = {
				tag: info.tag,
				name: info.name,
				type: info.type,
				description: info.description,
				location: {
					id: info.location?.id,
					name: info.location?.name,
					isCountry: info.location?.isCountry,
					countryCode: info.location?.countryCode,
					chatLanguage: info.chatLanguage,
				},
				level: info.clanLevel,
				labels: info.labels,
				badgeUrls: info.badgeUrls,
			},
			homeBase = {
				trophies: info.clanPoints,
				requirements: {
					trophies: info.requiredTrophies,
					townHall: info.requiredTownhallLevel,
				},
			},
			builderBase = {
				trophies: info.clanVersusPoints,
				requirements: {
					trophies: info.requiredVersusTrophies,
				},
			},
			clanCapital = {
				level: info.clanCapital.capitalHallLevel,
				districtCount: info.clanCapital.districts?.length,
				districts: info.clanCapital.districts,
			},
			war = {
				frequency: info.warFrequency,
				streak: info.warWinStreak,
				wins: info.warWins,
				ties: info.warTies,
				losses: info.warLosses,
				public: info.isWarLogPublic,
				league: info.warLeague,
			},
			members = {
				count: info.members,
				list: info.memberList,
			},
			data: ClashOfClansModifiedClanData = {
				profile,
				homeBase,
				builderBase,
				clanCapital,
				war,
				members,
			} as const;

		return data;
	}

	#ClashRoyaleModify(info: unknown) {
		return info;
	}

	#BrawlStarsModify(info: BrawlStarsClubData) {
		const profile = {
				tag: info.tag,
				name: info.name,
				description: info.description,
				type: info.type,
				badgeId: info.badgeId,
				trophies: info.trophies,
				requirements: {
					trophies: info.requiredTrophies,
				},
			},
			members = {
				count: info.members.length,
				list: info.members,
			},
			data: BrawlStarsModifiedClubData = {
				profile,
				members,
			};

		return data;
	}
})();
