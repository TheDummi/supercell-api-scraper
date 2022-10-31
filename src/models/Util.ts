import { FormattedGames, Games } from "../data/Games.js";

export default new (class Util {
	formatGame(game: Games) {
		(game as string) = game.toLowerCase();

		return FormattedGames[Games[game]];
	}
})();
