export default class Locations {
	#options: any;

	constructor(options: any) {
		this.#options = options;

		this.rankings = this.rankings;

		this.list = this.list;

		return this;
	}

	rankings(id: number, raw: boolean = false) {
		"/locations/{locationId}/rankings/players";
		"/locations/{locationId}/rankings/clans";
		"/locations/{locationId}/rankings/clans-versus";
		"/locations/{locationId}/rankings/players-versus";
	}

	list(id: number) {
		undefined;
		("/locations");
		("/locations/{locationId}");
	}
}
