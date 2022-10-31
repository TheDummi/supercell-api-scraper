import { FormattedGames, Games } from "../data/Games.js";

export function formatGame(game: Games) {
	(game as string) = game.toLowerCase();

	return FormattedGames[Games[game]];
}
