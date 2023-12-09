/** @format */

import Client from "../client/client.js";
import BaseGame from "../models/BaseGame.js";
import { FetchOptions } from "../types/interfaces.js";
import { GameDomains } from "../types/types.js";

export default class ClashRoyale extends BaseGame {
  public declare readonly players;

  constructor(client: Client) {
    super(client);

    this.players = {
      find: this.player,
    };
  }

  private async player(tag: string) {
    return await this.crFetch("players", { tag });
  }

  private async crFetch<T>(
    domain: GameDomains,
    options: FetchOptions,
  ): Promise<T> {
    return await this.fetch("Clash Royale", domain, options);
  }
}
