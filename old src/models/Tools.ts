import got from "got";
import { statusCodes } from "./Functions.js";

export async function fetch(
  token: string,
  game: string,
  domain: string,
  options?: { subdomain?: string; tag?: string },
) {
  const url = `https://api.${game.toLowerCase()}.com/v1/`;

  let request = url,
    response: any = null;

  if (domain) request += domain;

  if (options?.tag) request += `/%23${options.tag.replace(/#/g, "")}`;

  if (options?.subdomain) request += `/${options.subdomain}`;
  // console.log(request);
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
