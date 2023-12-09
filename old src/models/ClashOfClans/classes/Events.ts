export default class Events {
  #options: any;

  constructor(options: any) {
    this.#options = options;

    this.goldPass = this.goldPass;

    this.clanGames = this.clanGames;

    this.clanWarLeagues = this.clanWarLeagues;

    return this;
  }

  goldPass() {
    "/goldpass/seasons/current";
  }

  clanGames() {}

  clanWarLeagues() {}
}
