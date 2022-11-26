export default class Player {
	#client: any;

	constructor(client: any) {
		this.#client = client;

		this.clashOfClans = this.clashOfClans;

		return this;
	}
	async find(tag: string) {
		return {
			"Clash Of Clans": (await this.#client.ClashOfClans.players.find(tag))
				.profile,
			"Clash Royale": null,
			"Brawl Stars": null,
		};
	}

	async clashOfClans(tag: string, raw = false) {
		return await this.#client.ClashOfClans.players.find(tag, raw);
	}
}
