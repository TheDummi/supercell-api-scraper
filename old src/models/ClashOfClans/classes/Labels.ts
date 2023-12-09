export default class Labels {
  #options: any;

  constructor(options: any) {
    this.#options = options;

    this.players = this.players;

    this.clans = this.clans;

    return this;
  }

  players() {
    "/labels/players";
  }

  clans() {
    "/labels/clans";
  }
}
