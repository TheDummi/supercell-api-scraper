import {
	Games as GameTokens,
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
import ClashOfClans from "./models/ClashOfClans/Game.js";

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
	ClashOfClans: {
		token: string;
		fetchAll: boolean;
		logging: boolean;
	};
	ClashRoyale: {
		token: string;
		fetchAll: boolean;
		logging: boolean;
	};
	BrawlStars: {
		token: string;
		fetchAll: boolean;
		logging: boolean;
	};
}

export default class SupercellHandler {
	options: Options;
	ClashOfClans: object;

	constructor(options: Options) {
		this.options = options;

		this.ClashOfClans = new ClashOfClans(options);

		return this;
	}
}
