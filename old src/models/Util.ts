import { FormattedGames, Games } from "../data/Games.js";

export default new (class Util {
  constructor() {
    this.formatGame = this.formatGame;

    this.getGame = this.getGame;
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
})();
