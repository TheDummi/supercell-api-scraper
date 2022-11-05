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
	/**
	 * A function to get figure out which games have this tag for their clan or club.
	 * @param {string} tag - A string of a clan or club.
	 * @returns An array with object data.
	 */
	async findGuild(tag: string) {
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
	/**
	 * A function to get all info on a clan in Clash of Clans.
	 * @param {string} tag - A clan tag of a Clash of Clans clan.
	 * @param {boolean} raw - Whether to get the raw data or not.
	 * @returns an object with all data of a clan
	 */
	async fetchClashOfClansClan(tag: string, raw: boolean = false) {
		hasAPIToken(Games.ClashOfClans);

		let guild = await Game.fetch(Games.ClashOfClans, "clans", { tag });

		if (!raw) guild = this.#ClashOfClansModify(guild);

		return guild;
	}

	/**
	 * A function to get all info on a clan in Clash Royale.
	 * @param {string} tag - A clan tag of a Clash Royale clan.
	 * @param {boolean} raw - Whether to get the raw data or not.
	 * @returns an object with all data of a clan
	 */
	async fetchClashRoyaleClan(tag: string, raw: boolean = false) {
		hasAPIToken(Games.ClashRoyale);

		let guild = await Game.fetch(Games.ClashRoyale, "clans", { tag });

		if (!raw) guild = this.#ClashRoyaleModify(guild);

		return guild;
	}

	/**
	 * A function to get all info on a club in Brawl Stars.
	 * @param {string} tag - A club tag of a Brawl Stars club.
	 * @param {boolean} raw - Whether to get the raw data or not.
	 * @returns an object with all data of a club
	 */
	async fetchBrawlStarsClub(tag: string, raw: boolean = false) {
		hasAPIToken(Games.BrawlStars);

		let guild = await Game.fetch(Games.BrawlStars, "clubs", { tag });

		if (!raw) guild = this.#BrawlStarsModify(guild);

		return guild;
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
