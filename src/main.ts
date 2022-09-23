import Collection from "./data/Collection.js";

import Player from "./methods/Player.js";

export { Player };

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
