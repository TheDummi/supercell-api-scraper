export default class Guild {
  #client: any;

  constructor(client: any) {
    this.#client = client;

    this.find = this.find;

    this.clashOfClans = this.clashOfClans;

    return this;
  }

  async find(tag: string) {
    return {
      "Clash of Clans":
        (await this.#client.ClashOfClans.clans.find(tag)).profile || null,
      "Clash Royale": null,
      "Brawl Stars": null,
    };
  }

  async clashOfClans(tag: string, raw: boolean = false) {
    return await this.#client.ClashOfClans.clans.find(tag, raw);
  }
}
