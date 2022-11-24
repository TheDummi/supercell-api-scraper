export default class Player {
	#options: any;

	constructor(options: any) {
		this.#options = options;

		this.find = this.find;

		this.verifyToken = this.verifyToken;

		return this;
	}

	find(tag: string, raw: boolean = false) {
		"players/{playerTag}";
	}

	verifyToken(tag: string, raw: boolean = false) {
		"players/{playerTag}/verifyToken"; // POST
	}
}
