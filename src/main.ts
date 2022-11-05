import Collection from "./data/Collection.js";
import Player from "./models/Player.js";
import Status from "./models/Status.js";
import Guild from "./models/Guild.js";
import * as Types from "./data/Games.js";
import Ping from "./models/Ping.js";
import Util from "./models/Util.js";
import Game from "./models/Game.js";

export { Player, Status, Guild, Types, Ping, Util, Game };

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
	options: {};
	tokens: GameNames;
	player: typeof Player;
	guild: typeof Guild;
	status: typeof Status;
	ping: typeof Ping;
	util: typeof Util;
	game: typeof Game;
	types: typeof Types;

	constructor(options: Options) {
		this.options = options.options || {};

		this.tokens = options.tokens;

		if (this.tokens.ClashOfClans)
			Collection.ClashOfClans = this.tokens.ClashOfClans;

		if (this.tokens.ClashRoyale)
			Collection.ClashRoyale = this.tokens.ClashRoyale;

		if (this.tokens.BrawlStars) Collection.BrawlStars = this.tokens.BrawlStars;

		this.player = Player;

		this.guild = Guild;

		this.status = Status;

		this.ping = Ping;

		this.util = Util;

		this.game = Game;

		this.types = Types;

		return this;
	}
}
