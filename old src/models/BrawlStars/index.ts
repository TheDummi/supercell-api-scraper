import { Games } from "../../data/Games.js";
import { statusCodes } from "../Functions.js";
import * as Tools from "../Tools.js";

export default class BrawlStars {
  options: any;
  players: object;
  clubs: object;
  rankings: object;
  brawlers: object;
  events: object;

  constructor(options: any) {
    this.options = options.BrawlStars || null;

    this.players = {};

    this.clubs = {};

    this.rankings = {};

    this.brawlers = {};

    this.events = {};

    this.ping = this.ping;

    this.status = this.status;

    return this;
  }

  async ping() {
    const start = await Date.now();

    await this.#fetch("ping");

    return (await Date.now()) - start;
  }

  async status() {
    const response = await this.#fetch("brawlers");

    if ((response as { items: string }).items)
      return statusCodes({ message: "" });
    else return response;
  }

  async #fetch(domain: string, options?: Record<string, string>) {
    if (!this.options?.token)
      throw new Error(
        `To use this method for Brawl Stars you are required to have a valid token.`,
      );

    return await Tools.fetch(
      this.options.token,
      Games.BrawlStars,
      domain,
      options,
    );
  }
}
