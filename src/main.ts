import {
	Games as GameNames,
	Settings,
	Tokens,
	Options as Config,
	Setting,
} from "./data/Settings.js";
import Player from "./models/Player.js";
import Status from "./models/Status.js";
import Guild from "./models/Guild.js";
import { Games, FormattedGames } from "./data/Games.js";
import * as Types from "./data/Games.js";
import Ping from "./models/Ping.js";
import Util from "./models/Util.js";
import Game from "./models/Game.js";
import Rankings from "./models/Rankings.js";

export {
	Player,
	Status,
	Guild,
	Ping,
	Util,
	Game,
	Games,
	FormattedGames,
	Rankings,
};
interface Options {
	options?: Settings;
	tokens: GameNames;
}

export default class SupercellHandler {
	options: Settings;
	tokens: GameNames;
	player: typeof Player;
	guild: typeof Guild;
	rankings: typeof Rankings;
	util: typeof Util;
	game: typeof Game;
	types: typeof Types;

	constructor(options: Options) {
		this.options = options.options || {};

		Object.entries(this.options).map(([option, value]) => {
			Config[option as Setting] = value;
		});

		this.tokens = options.tokens;

		if (this.tokens.ClashOfClans)
			Tokens.ClashOfClans = this.tokens.ClashOfClans;

		if (this.tokens.ClashRoyale) Tokens.ClashRoyale = this.tokens.ClashRoyale;

		if (this.tokens.BrawlStars) Tokens.BrawlStars = this.tokens.BrawlStars;

		this.player = Player;

		this.guild = Guild;

		this.rankings = Rankings;

		this.util = Util;

		this.game = Game;

		this.types = Types;

		return this;
	}
}
