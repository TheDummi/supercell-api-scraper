import assets from "../data/ClashOfClans/Troops.js";
import { Games } from "../data/Games.js";
import { ClashOfClansModification } from "../interfaces/Modifications.js";
import { ClashOfClansTroop } from "../interfaces/Troops.js";
import Util from "../models/Util.js";
import fetch from "./Fetch.js";

export default new (class Player {
	async findPlayer(tag: string) {
		const players: Array<{}> = [];

		for (const game of [
			Games.BrawlStars,
			Games.ClashOfClans,
			Games.ClashRoyale,
		]) {
			const player = await fetch(game, "players", { tag });

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
		else return "No players found with tag " + tag;
	}

	async fetchChief(tag: string) {
		let player: ClashOfClansModification = await fetch(
			Games.ClashOfClans,
			"players",
			{ tag }
		);

		player = this.#ClashOfClansModify(player);

		return player;
	}

	async fetchKing(tag: string) {
		const player: object = await fetch(Games.ClashRoyale, "players", { tag });

		return player;
	}

	async fetchBrawler(tag: string) {
		const player: object = await fetch(Games.BrawlStars, "players", { tag });

		return player;
	}

	#ClashOfClansModify(data: ClashOfClansModification) {
		const troops = [
			...(data.troops || []),
			...(data.heroes || []),
			...(data.spells || []),
		];

		data.units = troops.map((troop: ClashOfClansTroop) => {
			const asset: any = assets.find((t) => troop.name === t.name) || troop;

			const index =
				troop.village == "home"
					? `th${data?.townHallLevel || 1}`
					: `bh${data?.builderHallLevel || 1}`;

			return {
				name: troop.name,
				currentLevel: troop.level,
				currentMaxLevel: asset.levels ? asset.levels[index] : troop.maxLevel,
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
		});

		const win: { value?: number } = data.achievements.find(
			(a: any) => a.name === "Conqueror"
		) || { value: 0 };

		data.wins = win.value;

		delete data.troops;
		delete data.heroes;
		delete data.spells;

		return data;
	}
})();
