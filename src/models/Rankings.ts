import { Games } from "../main.js";
import Game from "./Game.js";

export default new (class Rankings {
	constructor() {
		this.fetchLocations = this.fetchLocations;

		this.fetchPlayers = this.fetchPlayers;

		this.fetchGuilds = this.fetchGuilds;

		this.fetchVersus = this.fetchVersus;

		this.fetchBrawlers = this.fetchBrawlers;

		this.fetchClanWars = this.fetchClanWars;

		this.fetchLegends = this.fetchLegends;

		this.fetchSeasons = this.fetchSeasons;

		this.fetchTournaments = this.fetchTournaments;
	}

	async fetchLocations(
		game: Games,
		id?: number | string
	): Promise<Array<Record<string, string | number> | string> | string> {
		if (!game) throw new Error("No game provided");

		if (!id) throw new Error("No ID provided");

		if ([Games.ClashOfClans, Games.ClashRoyale].includes(game)) {
			if (!id)
				return (
					(await Game.fetch(game, "locations", {}))?.items ||
					`Couldn't find any locations.`
				);
			else
				return await Game.fetch(game, "locations", {
					subdomain: id.toString(),
				});
		} else if (game === Games.BrawlStars)
			return [
				"global",
				...(await Game.fetch(Games.ClashOfClans, "locations", {})).items
					.filter((location: Record<string, boolean>) => location.isCountry)
					.map((location: Record<string, string>) => location.countryCode),
			];
		else return `Couldn't find country codes for ${game}.`;
	}

	async fetchPlayers(
		game: Games,
		id: number | string
	): Promise<Array<Record<string, number | string | object>> | string> {
		if (!game) throw new Error("No game provided");

		if (!id) throw new Error("No ID provided");

		if ([Games.ClashOfClans, Games.ClashRoyale].includes(game)) {
			return (
				await Game.fetch(game, "locations", {
					subdomain: `${id}/rankings/players`,
				})
			)?.items;
		} else if (game === Games.BrawlStars)
			return (
				await Game.fetch(game, "rankings", { subdomain: `${id}/players` })
			)?.items;
		else return `Couldn't find players for ${game}.`;
	}

	async fetchGuilds(
		game: Games,
		id: string | number
	): Promise<Array<Record<string, string | number | object>> | string> {
		if (!game) throw new Error("No game provided");

		if (!id) throw new Error("No ID provided");

		if ([Games.ClashOfClans, Games.ClashRoyale].includes(game)) {
			return (
				await Game.fetch(game, "locations", {
					subdomain: `${id}/rankings/clans`,
				})
			)?.items;
		} else if (game === Games.BrawlStars)
			return (await Game.fetch(game, "rankings", { subdomain: `${id}/clubs` }))
				?.items;
		else return `Couldn't find clans or clubs with for ${game}.`;
	}

	async fetchVersus(
		id: string | number,
		type: string
	): Promise<Array<Record<string, string | number | object>>> {
		if (!id) throw new Error("No ID provided");

		if (!["players", "clans"].includes(type.toLowerCase()))
			throw new Error(`Type is not of type clans or players.`);

		return (
			await Game.fetch(Games.ClashOfClans, "locations", {
				subdomain: `${id}/rankings/${type.toLowerCase()}-versus`,
			})
		)?.items;
	}

	async fetchSeasons(
		game: Games,
		options?: { id?: number; seasonId?: number; type?: string }
	): Promise<Array<Record<string, string | number | object>> | string> {
		if (!game) throw new Error("No game provided");

		if (game === Games.ClashRoyale) {
			if (options?.seasonId) {
				if (options?.type?.toLowerCase() === "players")
					return (
						await Game.fetch(game, "locations/global/seasons", {
							subdomain: `${options.seasonId}/rankings/players`,
						})
					)?.items;
				else if (options?.type?.toLowerCase() === "seasons")
					return (
						await Game.fetch(game, "locations/global/seasons", {
							subdomain: `${options.seasonId}`,
						})
					)?.items;
				else return `${options.type} is not supported on this method.`;
			} else
				return (await Game.fetch(game, "locations/global/seasons", {}))?.items;
		} else if (game === Games.BrawlStars) {
			if (options?.id) {
				if (!options?.seasonId)
					return (
						await Game.fetch(game, "rankings", {
							subdomain: `${options.id}/powerplay/seasons`,
						})
					)?.items;
				else if (options?.seasonId)
					return (
						await Game.fetch(game, "rankings", {
							subdomain: `${options.id}/powerplay/seasons/${options.seasonId}`,
						})
					)?.items;
				else return `No info found.`;
			} else throw new Error("no ID provided");
		} else return `${game} is not supported on this method.`;
	}

	async fetchClanWars(
		id: string
	): Promise<Array<Record<string, string | number | object>>> {
		if (!id) throw new Error("No ID provided");

		return (
			await Game.fetch(Games.ClashRoyale, "locations", {
				id,
				subdomain: "rankings/clanwars",
			})
		)?.items;
	}

	async fetchLegends(
		id: string
	): Promise<Array<Record<string, string | number | object>>> {
		if (!id) throw new Error("No ID provided");

		return (
			await Game.fetch(Games.ClashRoyale, "locations", {
				id,
				subdomain: "pathoflegend/players",
			})
		)?.items;
	}

	async fetchTournaments(
		id: string
	): Promise<Array<Record<string, string | number | object>>> {
		if (!id) throw new Error("No ID provided");

		return (
			await Game.fetch(Games.ClashRoyale, "locations", {
				id,
				subdomain: "rankings/clanwars",
			})
		)?.items;
	}
	// fetchTournaments(tag) {
	//     cr = locations/global/rankings/tournaments/{tag}
	// }

	async fetchBrawlers(
		id: string,
		brawlerId: number | string
	): Promise<Array<Record<string, string | number | object>>> {
		if (!id) throw new Error("No ID provided");

		if (!brawlerId) throw new Error("No brawlerId provided");

		return (
			await Game.fetch(Games.BrawlStars, "rankings", {
				id,
				subdomain: `brawlers/${brawlerId}`,
			})
		)?.items;
	}
})();
