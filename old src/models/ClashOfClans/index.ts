import { Games } from "../../data/Games.js";
import { statusCodes } from "../Functions.js";
import * as Tools from "../Tools.js";
import Clans from "./classes/Clans.js";
import Events from "./classes/Events.js";
import Labels from "./classes/Labels.js";
import Leagues from "./classes/Leagues.js";
import Locations from "./classes/Locations.js";
import Player from "./classes/Players.js";

export default class ClashOfClans {
  options: any;
  players: any;
  clans: any;
  leagues: any;
  locations: any;
  events: any;
  labels: any;

  constructor(options: any) {
    this.options = options.ClashOfClans || null;

    this.players = new Player(this.options);

    this.clans = new Clans(this.options);

    this.leagues = new Leagues(this.options);

    this.locations = new Locations(this.options);

    this.events = new Events(this.options);

    this.labels = new Labels(this.options);

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
    const response = await this.#fetch("locations");

    if ((response as { items: string }).items)
      return statusCodes({ message: "" });
    else return response;
  }

  async #fetch(domain: string, options?: Record<string, string>) {
    if (!this.options?.token)
      throw new Error(
        `To use this method for Clash of Clans you are required to have a valid token.`,
      );

    return await Tools.fetch(
      this.options.token,
      Games.ClashOfClans,
      domain,
      options,
    );
  }
}
