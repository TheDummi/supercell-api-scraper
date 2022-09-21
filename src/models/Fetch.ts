import { Games } from "../data/Games.js";
import Collection from "../data/Collection.js";
import got from "got";

interface Options {
	tag?: string;
	domain?: string;
	subdomain?: string;
	id?: string;
}

interface Request {
	url?: string;
	key?: unknown;
}

export default async function fetch(
	game: Games,
	domain: string,
	options: Options
) {
	let request: Request = {
			url: `https://api.${game.toLowerCase()}.com/v1/`,
			key: Collection[game.toLowerCase()],
		},
		response;

	options.domain = "";

	if (options.tag) options.domain += "/%23" + options.tag.replace(/#/g, "");

	if (options.id) options.domain += "/" + options.id;

	if (options.subdomain) options.domain += "/" + options.subdomain;

	// console.log(request.url + domain + options.domain);

	try {
		response = await got.get({
			url: request.url + domain + options.domain,
			headers: {
				Accept: "application/json",
				Authorization: "Bearer " + request.key,
			},
		});

		response = JSON.parse(response.body);
	} catch (error) {
		response = error;
	}

	return response;
}
