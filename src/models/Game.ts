import { Games } from "../data/Games.js";
import Collection from "../data/Collection.js";
import got from "got";
import { statusCodes } from "./Functions.js";
import { Options, Request } from "../interfaces/fetch.js";
import Util from "./Util.js";

export default new (class Game {
	/**
	 * A function to fetch API data from a supercell domain.
	 * @param {Games} game - The game to read the API from.
	 * @param {string} domain  - The domain you want to read.
	 * @param {Options} options - Options for more and unique URLs.
	 * @returns API data.
	 */
	async fetch(game: Games, domain: string, options: Options) {
		let request: Request = {
				url: `https://api.${game.toLowerCase()}.com/v1/`,
				key: Collection[Util.getGame(game) || Games.ClashOfClans],
			},
			response;

		options.domain = "";

		if (options.tag) options.domain += "/%23" + options.tag.replace(/#/g, "");

		if (options.id) options.domain += "/" + options.id;

		if (options.subdomain) options.domain += "/" + options.subdomain;

		try {
			response = await got.get({
				url: request.url + domain + options.domain,
				headers: {
					Accept: "application/json",
					Authorization: "Bearer " + request.key,
				},
			});

			response = JSON.parse(response.body);
		} catch (error: any) {
			response = statusCodes(error);
		}

		return response;
	}
})();
