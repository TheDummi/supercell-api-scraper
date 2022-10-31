import Collection from "./data/Collection.js";

import Player from "./models/Player.js";
import Status from "./models/Status.js";
import Guild from "./models/Guild.js";
import { Games, FormattedGames } from "./data/Games.js";
import Ping from "./models/Ping.js";
import * as Util from "./models/Util.js";

export { Player, Status, Guild, Games, FormattedGames, Ping, Util };

interface Game {
	clashOfClans?: string;
	clashRoyale?: string;
	brawlStars?: string;
}

export default class SupercellHandler {
	gameOptions: Game;

	constructor(gameOptions: Game) {
		this.gameOptions = gameOptions;

		Object.entries(gameOptions).map(
			([game, value]) => (Collection[game.toLowerCase()] = value)
		);

		return this;
	}
}
