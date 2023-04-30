import Client from '../client/client.js';
import { ClientOptions, FetchOptions } from '../types/interfaces.js';
import { Game, GameDomains } from '../types/types.js';

export default class BaseGame {
	public declare readonly client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	public async fetch(game: Game, domain: GameDomains, options?: FetchOptions) {
		const token = BaseGame.token(game, this.client.options);

		if (!token) throw new Error(`There is no token for specified game!`);

		const url = `https://api.${game.toLowerCase().replace(/ +/gim, '')}.com/v1/`;

		let request = url,
			response = null;

		request += domain;

		if (options?.predomain) request += `/${options.predomain}`;

		if (options?.tag) request += `/%23${options.tag.replace(/#/gim, '')}`;

		if (options?.name) request += `?name=${options.name.replace(/ /gim, '%20')}`;

		if (options?.subdomain) request += `/${options.subdomain}`;

		if (this.client.options.config?.debug) console.info(`Request URL: ${request}`);

		try {
			response = await fetch(request, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer ' + token,
				},
			});

			if (this.client.options.config?.debug) console.info(`Response Status: ${response.status}`);

			response = await response.json();
		} catch (error) {
			console.log(error);
		}

		return response;
	}

	private static token(game: Game, options: ClientOptions) {
		switch (game) {
			case 'Brawl Stars':
				return options.BrawlStars?.token || null;
			case 'Clash of Clans':
				return options.ClashOfClans?.token || null;
			case 'Clash Royale':
				return options.ClashRoyale?.token || null;
		}
	}
}
