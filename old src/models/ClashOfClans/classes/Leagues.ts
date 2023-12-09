export default class Leagues {
  #options: any;

  constructor(options: any) {
    this.#options = options;

    this.player = this.player;

    this.war = this.war;

    this.seasons = this.seasons;

    return this;
  }

  player(id?: number) {
    undefined;
    ("/leagues");
    ("/leagues/{leagueId}");
  }

  war(id?: number) {
    undefined;
    ("/warleagues");
    ("/warleagues/{warleagueId}");
  }

  seasons(leagueId: number, seasonId?: number) {
    undefined;
    ("/leagues/{leagueId}/seasons");
    ("/leagues/{leagueId}/seasons/{seasonId}");
  }
}
