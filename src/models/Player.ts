import assets from "../data/ClashOfClans/Troops.js";
import { Village } from "../data/ClashOfClans/types.js";
import { Options, Tokens } from "../data/Settings.js";
import { Games } from "../data/Games.js";
import {
	ClashOfClansPlayerData,
	ClashOfClansModifiedPlayerData,
	ClashRoyalePlayerData,
	ClashRoyaleModifiedPlayerData,
	BrawlStarsPlayerData,
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

		this.#isTag(tag);

		for (const game of [
			Games.BrawlStars,
			Games.ClashOfClans,
			Games.ClashRoyale,
		]) {
			if (!Object.hasOwn(Tokens, game)) continue;

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
	 * A function to get all data provided by supercell on a single Clash of Clans player.
	 * @param {string} tag - Player tag
	 * @param {boolean} raw - Whether to get the raw data or not
	 * @returns Clash of Clans player.
	 */
	async fetchClashOfClansPlayer(
		tag: string,
		raw: boolean = false
	): Promise<ClashOfClansModifiedPlayerData | ClashOfClansPlayerData> {
		hasAPIToken(Games.ClashOfClans);

		this.#isTag(tag);

		let player = await Game.fetch(Games.ClashOfClans, "players", { tag });

		const check = this.#isPlayer(player, tag);

		if (check) player = check;

		if (!raw && typeof player !== "string")
			player = this.#ClashOfClansModify(player);

		return player;
	}

	/**
	 * A function to get all data provided by supercell on a single Clash Royale player.
	 * @param {string} tag - Player tag.
	 * @param {boolean} raw - Whether to get the raw data or not
	 * @returns Clash Royale player.
	 */
	async fetchClashRoyalePlayer(
		tag: string,
		raw: boolean = false
	): Promise<ClashRoyaleModifiedPlayerData | ClashOfClansPlayerData> {
		hasAPIToken(Games.ClashRoyale);

		this.#isTag(tag);

		let player = await Game.fetch(Games.ClashRoyale, "players", {
			tag,
		});

		const check = this.#isPlayer(player, tag);

		if (check) player = check;

		if (!raw && typeof player !== "string")
			player = this.#ClashRoyaleModify(player);

		return player;
	}

	/**
	 * A function to get all data provided by supercell on a single Brawl Stars player.
	 * @param {string} tag - Player tag.
	 * @param {boolean} raw - Whether to get the raw data or not
	 * @returns Brawl Stars player.
	 */
	async fetchBrawlStarsPlayer(tag: string, raw: boolean = false) {
		hasAPIToken(Games.BrawlStars);

		this.#isTag(tag);

		let player = await Game.fetch(Games.BrawlStars, "players", {
			tag,
		});

		const check = this.#isPlayer(player, tag);

		if (check) player = check;

		if (!raw && typeof player !== "string")
			player = this.#BrawlStarsModify(player);

		return player;
	}

	#ClashOfClansModify(info: ClashOfClansPlayerData) {
		const troops = [
				...(info.troops || []),
				...(info.heroes || []),
				...(info.spells || []),
			],
			profile = {
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
			units = troops.map((troop) => {
				const asset: Record<string, any> =
					assets.find((t) => troop.name === t.name) || troop;

				const index =
					troop.village == Village.Home
						? `th${info?.townHallLevel || 1}`
						: `bh${info?.builderHallLevel || 1}`;

				return {
					name: troop.name,
					level: troop.level,
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
			data: ClashOfClansModifiedPlayerData = {
				profile,
				homeBase,
				builderBase,
				guild,
				season,
				units,
				achievements,
			} as const;

		return data;
	}

	#ClashRoyaleModify(info: ClashRoyalePlayerData) {
		const profile = {
				tag: info.tag,
				name: info.name,
				level: info.expLevel,
				xp: info.expPoints,
				totalXp: info.totalExpPoints,
				arena: info.arena,
				trophies: info.trophies,
				trophyRecord: info.bestTrophies,
			},
			battle = {
				wins: info.wins,
				losses: info.losses,
				count: info.battleCount,
				threeCrowns: info.threeCrownWins,
			},
			guild = {
				tag: info.clan?.tag,
				name: info.clan?.name,
				badgeId: info.clan?.badgeId,
				role: info?.role,
				war: {
					wins: info.warDayWins,
					cards: info.clanCardsCollected,
				},
			},
			season = {
				previous: {
					id: info.leagueStatistics?.previousSeason?.id,
					rank: info.leagueStatistics?.previousSeason?.rank,
					trophies: info.leagueStatistics?.previousSeason?.trophies,
					trophyRecord: info.leagueStatistics?.previousSeason?.bestTrophies,
				},
				current: {
					trophies: info.leagueStatistics?.currentSeason?.trophies,
					donations: info.donations,
					donationsReceived: info.donationsReceived,
					deck: info.currentDeck,
				},
				record: {
					id: info.leagueStatistics?.bestSeason?.id,
					rank: info.leagueStatistics?.bestSeason?.rank,
					trophies: info.leagueStatistics?.bestSeason?.trophies,
				},
			},
			events = {
				challenge: {
					cards: info.challengeCardsWon,
					streak: info.challengeMaxWins,
				},
				tournament: {
					cards: info.tournamentCardsWon,
					battles: info.tournamentBattleCount,
				},
			},
			badges = info.badges,
			units = {
				cards: { count: info.cards.length, list: info.cards },
				favouriteCard: info.currentFavouriteCard,
			},
			achievements = info.achievements,
			data: ClashRoyaleModifiedPlayerData = {
				profile,
				battle,
				guild,
				season,
				events,
				units,
				badges,
				achievements,
			} as const;

		return data;
	}

	#BrawlStarsModify(info: BrawlStarsPlayerData) {
		return info;
	}

	#isTag(tag: string) {
		if (!tag) throw new Error("No tag provided.");
	}

	#isPlayer(
		player: ClashOfClansPlayerData | ClashOfClansPlayerData,
		// | BrawlStarsPlayerData,
		tag: string
	) {
		if (!player.tag)
			return `Couldn't find player with tag ${tag.toUpperCase()}.`;
	}
})();
