import Client from '../client/client.js';
import BaseGame from '../models/BaseGame.js';

export default class BrawlStars extends BaseGame {
	constructor(client: Client) {
		super(client);
	}
}
