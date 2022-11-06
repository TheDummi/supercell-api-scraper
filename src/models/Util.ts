import { FormattedGames, Games } from "../data/Games.js";
import Game from "./Game.js";

export default new (class Util {
	constructor() {
		this.formatGame = this.formatGame;

		this.getGame = this.getGame;

		this.fetchCountryName = this.fetchCountryName;
	}

	formatGame(game: Games) {
		(game as string) = game.toLowerCase();

		return FormattedGames[Games[game]];
	}

	getGame(game: string) {
		game = game.toLowerCase();

		if (game === Games.ClashOfClans.toLowerCase()) return Games.ClashOfClans;
		else if (game === Games.ClashRoyale.toLowerCase()) return Games.ClashRoyale;
		else if (game === Games.BrawlStars.toLowerCase()) return Games.BrawlStars;
	}

	async fetchCountryName(
		game: Games,
		id: number | string
	): Promise<string | null> {
		if (!id) throw new Error("No ID provided");

		if (isNaN(parseInt(id as string)))
			throw new Error(
				`Expected id to be of type number received ${typeof id} instead.`
			);

		if (![Games.ClashOfClans, Games.ClashRoyale].includes(game))
			return `${game} is not supported on this method.`;

		return (
			(await Game.fetch(game, "locations", { id: id.toString() }))?.name || null
		);
	}

	async fetchCountryId(
		game: Games,
		name: string
	): Promise<number | string | null> {
		if (!name) throw new Error("No ID provided");

		if (![Games.ClashOfClans, Games.ClashRoyale].includes(game))
			return `${game} is not supported on this method.`;

		return (
			(await Game.fetch(game, "locations", {}))?.items?.find(
				(c: Record<string, string>) =>
					c.name.toLowerCase() === name.toLowerCase() ||
					c.countryCode?.toLowerCase() === name.toLowerCase()
			)?.id || null
		);
	}
})();
