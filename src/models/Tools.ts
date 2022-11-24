import got from "got";
import { statusCodes } from "./Functions.js";

export async function fetch(
	token: string,
	game: string,
	domain: string,
	options?: { subdomain?: string; tag?: string }
) {
	const url = `https://api.${game.toLowerCase()}.com/v1/`;

	let request = url,
		response:
			| null
			| Record<"body", string>
			| Record<string, number | string | "online" | "offline" | boolean> = null;

	if (domain) request += domain;

	if (options?.tag) request += `/%20${options.tag.replace(/#/g, "")}`;

	if (options?.subdomain) request += `/${options.subdomain}`;

	try {
		response = await got.get({
			url: request,
			headers: {
				Accept: "application/json",
				Authorization: "Bearer " + token,
			},
		});
		response = JSON.parse(response.body);
	} catch (error: any) {
		response = statusCodes(error);
	}

	return response;
}
