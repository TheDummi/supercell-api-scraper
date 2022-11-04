import assets from "../data/ClashOfClans/Troops.js";
import { Village } from "../data/ClashOfClans/types.js";
import Collection from "../data/Collection.js";
import { Games } from "../data/Games.js";
import {
	ClashOfClansData,
	ClashOfClansModifiedData,
	ClashOfClansTroop,
} from "../interfaces/Modifications.js";
import Util from "../models/Util.js";
import Game from "./Game.js";
import { hasAPIToken } from "./Functions.js";

/**
 * Any function related to a player can be accessed from here.
 */
export default new (class Player {
	/**
	 * A function to find all players with a the same unique ID in each game.
	 * @param {string} tag - player tag.
	 * @returns name, tag, game and formatted game the tag is found.
	 */
	async findPlayer(tag: string) {
		const players: Array<Record<string, string>> = [];

		for (const game of [
			Games.BrawlStars,
			Games.ClashOfClans,
			Games.ClashRoyale,
		]) {
			if (!Object.hasOwn(Collection, game)) continue;

			const player = await Game.fetch(game, "players", { tag });

			if (player.tag) {
				players.push({
					name: player.name,
					tag: player.tag,
					game: game,
					formattedGame: Util.formatGame(game),
				});
			}
		}

		if (Object.keys(players).length > 0) return players;
		else return `No players found with tag ${tag}`;
	}

	/**
	 * A function to get all data surrounded a single player.
	 * @param {string} tag - The player's tag.
	 * @param {boolean} raw - Whether to get the raw data or not.
	 * @returns Clash of Clans player.
	 */
	async fetchChief(
		tag: string,
		raw: boolean = false
	): Promise<ClashOfClansModifiedData | ClashOfClansData> {
		hasAPIToken(Games.ClashOfClans);

		let player = await Game.fetch(Games.ClashOfClans, "players", { tag });

		if (!raw) player = this.#ClashOfClansModify(player);

		return player;
	}

	async fetchKing(tag: string, raw: boolean = false) {
		hasAPIToken(Games.ClashRoyale);

		const player: object = await Game.fetch(Games.ClashRoyale, "players", {
			tag,
		});

		return player;
	}

	async fetchBrawler(tag: string, raw: boolean = false) {
		hasAPIToken(Games.BrawlStars);

		const player: object = await Game.fetch(Games.BrawlStars, "players", {
			tag,
		});

		return player;
	}

	#ClashOfClansModify(info: ClashOfClansData) {
		const troops = [
				...(info.troops || []),
				...(info.heroes || []),
				...(info.spells || []),
			],
			player = {
				tag: info.tag,
				name: info.name,
				level: info.expLevel,
				warStatus: info.warPreference,
				warStars: info.warStars,
				labels: info.labels,
			},
			homeBase = {
				level: info.townHallLevel,
				weaponLevel: info.townHallWeaponLevel || 0,
				trophies: info.trophies,
				trophyRecord: info.bestTrophies,
				wins:
					info.achievements.find(
						(a: Record<"name", string>) => a.name === "Conqueror"
					)?.value || 0,
			},
			builderBase = {
				level: info.builderHallLevel,
				trophies: info.versusTrophies,
				trophyRecord: info.bestVersusTrophies,
				wins: info.versusBattleWinCount || info.versusBattleWins,
			},
			guild = {
				tag: info.clan.tag,
				name: info.clan.name,
				level: info.clan.clanLevel,
				role: info.role,
				contributions: info.clanCapitalContributions,
				iconUrls: info.clan.badgeUrls,
			},
			season = {
				wins: info.attackWins || 0,
				defenses: info.defenseWins || 0,
				donations: info.donations || 0,
				donationsReceived: info.donationsReceived || 0,
				league: info.league || undefined,
			},
			units = troops.map((troop: ClashOfClansTroop) => {
				const asset: Record<string, any> =
					assets.find((t) => troop.name === t.name) || troop;

				const index =
					troop.village == Village.Home
						? `th${info?.townHallLevel || 1}`
						: `bh${info?.builderHallLevel || 1}`;

				return {
					name: troop.name,
					currentLevel: troop.level,
					currentMaxLevel: asset.levels
						? asset.levels[index] || troop.maxLevel
						: troop.maxLevel,
					maxLevel: troop.maxLevel,
					village: asset?.village,
					type: asset?.type,
					resource: asset?.resource,
					progress: `${
						Math.floor(
							((troop?.level || 0) / (asset.levels[index] || troop.maxLevel)) *
								10000
						) / 100
					}%`,
				};
			}),
			achievements = info.achievements,
			data: ClashOfClansModifiedData = {
				player,
				homeBase,
				builderBase,
				guild,
				season,
				units,
				achievements,
			} as const;

		return data;
	}
})();
