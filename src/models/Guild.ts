import { Games } from "../data/Games.js";
import Game from "./Game.js";

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
				});
			else continue;
		}

		if (guilds.length > 0) return guilds;
		else return "No guilds found with tag " + tag;
	}
	/**
	 * A function to get all info on a clan in Clash of Clans.
	 * @param {string} tag - A clan tag of a Clash of Clans clan.
	 * @returns an object with all data of a clan
	 */
	async fetchClashOfClansClan(tag: string) {}

	/**
	 * A function to get all info on a clan in Clash Royale.
	 * @param {string} tag - A clan tag of a Clash Royale clan.
	 * @returns an object with all data of a clan
	 */
	async fetchClashRoyaleClan(tag: string) {}

	/**
	 * A function to get all info on a club in Brawl Stars.
	 * @param {string} tag - A club tag of a Brawl Stars club.
	 * @returns an object with all data of a club
	 */
	async fetchBrawlStarsClub(tag: string) {}
})();
