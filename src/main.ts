import Collection from "./data/Collection.js";

import Player from "./models/Player.js";
import Status from "./models/Status.js";
import Guild from "./models/Guild.js";
import { Games, FormattedGames, Game } from "./data/Games.js";
import Ping from "./models/Ping.js";
import Util from "./models/Util.js";
import fetch from "./models/Fetch.js";

export { Player, Status, Guild, Games, FormattedGames, Ping, Util, fetch };

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
