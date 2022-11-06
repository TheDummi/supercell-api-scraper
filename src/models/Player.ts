import assets from "../data/ClashOfClans/Troops.js";
import { Village } from "../data/ClashOfClans/types.js";
import { Tokens } from "../data/Settings.js";
import { Games } from "../data/Games.js";
import {
	ClashOfClansPlayerData,
	ClashOfClansModifiedPlayerData,
	ClashRoyalePlayerData,
	ClashRoyaleModifiedPlayerData,
	BrawlStarsPlayerData,
	BrawlStarsModifiedPlayerData,
	ClashOfClansClanData,
	ClashOfClansModifiedClanData,
	ClashRoyaleClanData,
	ClashRoyaleModifiedClanData,
	BrawlStarsClubData,
	BrawlStarsModifiedClubData,
} from "../interfaces/Modifications.js";
import Util from "../models/Util.js";
import Game from "./Game.js";
import { hasAPIToken } from "./Functions.js";
import Guild from "./Guild.js";

/**
 * Any function related to a player can be accessed from here.
 */
export default new (class Player {
	constructor() {
		this.find = this.find;

		this.fetch = this.fetch;

		this.fetchGuild = this.fetchGuild;
	}

	/**
	 * A function to find all players with a the same unique ID in each game.
	 * @param {string} tag - player tag.
	 * @returns name, tag, game and formatted game the tag is found.
	 */
	async find(tag: string) {
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
	 * A function to fetch player data.
	 * @param {string} tag - Player tag
	 * @param {Games} game - The game
	 * @param {boolean} raw - Whether to get the raw data or the modified data
	 * @returns player data.
	 */
	async fetch(
		tag: string,
		game: Games,
		raw: boolean = false
	): Promise<
		| ClashOfClansModifiedPlayerData
		| ClashOfClansPlayerData
		| ClashRoyaleModifiedPlayerData
		| ClashRoyalePlayerData
		| BrawlStarsModifiedPlayerData
		| BrawlStarsPlayerData
		| string
	> {
		hasAPIToken(game);

		const player = await Game.fetch(game, "players", { tag });

		if (!player.tag)
			return `Couldn't find player with tag ${tag.toUpperCase()}`;

		if (game === Games.ClashOfClans && !raw)
			return this.#ClashOfClansModify(player);
		else if (game === Games.ClashRoyale && !raw)
			return this.#ClashRoyaleModify(player);
		else if (game === Games.BrawlStars && !raw)
			return this.#BrawlStarsModify(player);
		else return player;
	}

	/**
	 * A function to get the clan or club from a player tag.
	 * @param {string} tag - Player tag
	 * @param {Games} game - The game
	 * @param {boolean} raw - Whether to get the raw data or modified data
	 * @returns clan or club data.
	 */
	async fetchGuild(
		tag: string,
		game: Games,
		raw: boolean = false
	): Promise<
		| ClashOfClansClanData
		| ClashOfClansModifiedClanData
		| ClashRoyaleClanData
		| ClashRoyaleModifiedClanData
		| BrawlStarsClubData
		| BrawlStarsModifiedClubData
		| string
	> {
		hasAPIToken(game);

		const player = await Game.fetch(game, "players", { tag });

		if (!player.tag)
			return `Couldn't find player with tag ${tag.toUpperCase()}`;

		if (!player.clan && !player.club)
			return `${player.name} (${player.tag}) is not in a clan or club.`;

		if (game === Games.ClashOfClans)
			return this.#fetchClan(player.clan.tag, game, raw);
		else if (game === Games.ClashRoyale)
			return this.#fetchClan(player.clan.tag, game, raw);
		else if (game === Games.BrawlStars)
			return this.#fetchClan(player.club.tag, game, raw);
		else return this.#fetchClan(player.club || player.clan, game, raw);
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
		const profile = {
				tag: info.tag,
				name: info.name,
				color: {
					rgba: info.nameColor.toUpperCase(),
					hex: `#${info.nameColor.slice(2, 8).toUpperCase()}`,
				},
				icon: info.icon.id,
				trophies: info.trophies,
				trophyRecord: info.highestTrophies,
				level: info.expLevel,
				totalXp: info.expPoints,
			},
			battle = {
				wins:
					info["3vs3Victories"] + info.duoVictories + info.soloVictories || 0,
				"3vs3": info["3vs3Victories"] || 0,
				duo: info.duoVictories || 0,
				solo: info.soloVictories || 0,
				time: {
					roboRumble: info.bestRoboRumbleTime || 0,
					bigBrawler: info.bestTimeAsBigBrawler || 0,
				},
			},
			guild = {
				tag: info.club.tag,
				name: info.club.name,
			},
			brawlers = info.brawlers,
			data: BrawlStarsModifiedPlayerData = {
				profile,
				battle,
				guild,
				brawlers,
			} as const;
		return data;
	}

	#isTag(tag: string) {
		if (!tag) throw new Error("No tag provided.");
	}

	async #fetchClan(tag: string, game: Games, raw: boolean = false) {
		return await Guild.fetch(tag, game, raw);
	}
})();
