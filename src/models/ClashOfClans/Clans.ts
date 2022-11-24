export default class Clans {
	#options: any;

	constructor(options: any) {
		this.#options = options;

		this.find = this.find;

		this.warLeagues = this.warLeagues;

		this.leagueGroup = this.leagueGroup;

		this.currentWar = this.currentWar;

		this.members = this.members;

		this.capitalRaidSeasons = this.capitalRaidSeasons;

		return this;
	}

	find(tag: string, raw: boolean = false) {
		"/clans/{tag}";
	}

	warLeagues(tag: string, raw: boolean = false) {
		"/clanwarleagues/wars/{warTag}";
	}

	leagueGroup(tag: string, raw: boolean = false) {
		"/clans/{clanTag}/currentwar/leaguegroup";
	}

	currentWar(tag: string, raw: boolean = false) {
		"/clans/{clanTag}/currentwar";
	}

	members(tag: string, raw: boolean = false) {
		"/clans/{clanTag}/members";
	}

	capitalRaidSeasons(tag: string, raw: boolean = false) {
		"/clans/{clanTag}/capitalraidseasons";
	}
}
