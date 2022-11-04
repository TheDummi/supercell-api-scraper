import Collection from "./data/Collection.js";

import Player from "./models/Player.js";
import Status from "./models/Status.js";
import Guild from "./models/Guild.js";
import { Games, FormattedGames } from "./data/Games.js";
import Ping from "./models/Ping.js";
import Util from "./models/Util.js";
import Game from "./models/Game.js";
// import fetch from "./models/Fetch.js";

export { Player, Status, Guild, Games, FormattedGames, Ping, Util, Game };

interface GameNames {
	ClashOfClans?: string;
	ClashRoyale?: string;
	BrawlStars?: string;
}

interface Options {
	options?: object;
	tokens: GameNames;
}
export default class SupercellHandler {
	tokens: GameNames;

	constructor(options: Options) {
		this.tokens = options.tokens;

		if (this.tokens.ClashOfClans)
			Collection.ClashOfClans = this.tokens.ClashOfClans;

		if (this.tokens.ClashRoyale)
			Collection.ClashRoyale = this.tokens.ClashRoyale;

		if (this.tokens.BrawlStars) Collection.BrawlStars = this.tokens.BrawlStars;

		return this;
	}
}
