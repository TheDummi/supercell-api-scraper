import Collection from "../data/Collection.js";
import { Games } from "../main.js";

/**
 * A function to transform error responses into status codes.
 * @param {Record<string, object>} status - the error.
 * @returns a status code.
 */
export function statusCodes(status: Record<"message", string>) {
	if (!status.message)
		return { online: true, code: 200, info: "Service available" };
	else if (status.message.includes("403"))
		return { online: false, code: 403, info: "Service access denied" };
	else if (status.message.includes("404"))
		return { online: false, code: 404, info: "Service not found" };
	else if (status.message.includes("429"))
		return { online: false, code: 429, info: "Service hit a rate limit" };
	else if (status.message.includes("503"))
		return { online: false, code: 503, info: "Service under maintenance" };
	else return { online: false, code: 503, info: "Service unreachable" };
}

/**
 * A function to check if the current method has an API token.
 * @param {Games} game - The game.
 */
export function hasAPIToken(game: Games) {
	if (
		game === Games.ClashOfClans &&
		!Collection[Games.ClashOfClans.toLowerCase()]
	)
		throw new Error(
			"Can't use this method without having a Clash of Clans API token."
		);
	if (
		game === Games.ClashRoyale &&
		!Collection[Games.ClashRoyale.toLowerCase()]
	)
		throw new Error(
			"Can't use this method without having a Clash Royale API token."
		);
	if (game === Games.BrawlStars && !Collection[Games.BrawlStars.toLowerCase()])
		throw new Error(
			"Can't use this method without having a Brawl Stars API token."
		);
}
