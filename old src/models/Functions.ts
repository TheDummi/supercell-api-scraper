import { Games } from "../data/Games.js";

/**
 * A function to transform error responses into status codes.
 * @param {Record<"message", string>} status - the error.
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
	else return { online: false, code: 504, info: "Service unreachable" };
}
