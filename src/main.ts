import ClashOfClans from "./models/ClashOfClans/index.js";
import ClashRoyale from "./models/ClashRoyale/index.js";
import BrawlStars from "./models/BrawlStars/index.js";
import WebSocket from "./models/classes/Websocket.js";
import Player from "./models/classes/Player.js";
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
	ClashRoyale: object;
	BrawlStars: object;
	player: object;
	ws: object;

	constructor(options: Options) {
		this.options = options;

		this.ClashOfClans = new ClashOfClans(options);

		this.ClashRoyale = new ClashRoyale(options);

		this.BrawlStars = new BrawlStars(options);

		this.player = new Player(this);

		this.ws = new WebSocket(this);

		return this;
	}
}
