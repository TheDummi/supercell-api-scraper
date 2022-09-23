import Collection from "./data/Collection.js";
import {
	validatePlayerTag,
	fetchKing,
	fetchChief,
	fetchBrawler,
} from "./methods/Player.js";

interface Game {
	clashOfClans?: string;
	clashRoyale?: string;
	brawlStars?: string;
}

export default class SupercellHandler {
	gameOptions: Game;
	[index: string]: object;

	constructor(gameOptions: Game) {
		this.gameOptions = gameOptions;

		Object.entries(gameOptions).map(
			([game, value]) => (Collection[game.toLowerCase()] = value)
		);

		this.validatePlayerTag = validatePlayerTag;
		this.fetchChief = fetchChief;
		this.fetchKing = fetchKing;
		this.fetchBrawler = fetchBrawler;

		return this;
	}
}
