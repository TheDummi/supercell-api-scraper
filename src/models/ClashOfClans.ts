import Client from '../client/client.js';
import { FetchOptions } from '../types/interfaces.js';
import { GameDomains } from '../types/types.js';
import {
	ClashOfClansBaseClan,
	ClashOfClansCapitalRaidSeason,
	ClashOfClansCurrentWar,
	ClashOfClansLeagueGroup,
	ClashOfClansLeagueWar,
	ClashOfClansMember,
	ClashOfClansModifiedClan,
	ClashOfClansWarlog,
} from '../types/ClashOfClans.js';
import BaseGame from './BaseGame.js';
import SupercellError from './SupercellError.js';

export default class ClashOfClans extends BaseGame {
	public declare readonly players;
	public declare readonly clans;
	public declare readonly leagues;
	public declare readonly rankings;
	public declare readonly goldpass;
	public declare readonly esports;
	public declare readonly labels;

	constructor(client: Client) {
		super(client);

		if (!this.client.options.ClashOfClans)
			throw new SupercellError(
				'No token was provided, you can generate a token on the official developer site of Clash of Clans here: https://developer.clashofclans.com/#/new-key'
			);

		this.clans = {
			leagueGroup: (tag: string): Promise<ClashOfClansLeagueGroup> => this.leagueGroup(tag),
			leagueWar: (tag: string): Promise<ClashOfClansLeagueWar> => this.leagueWar(tag),
			warlog: (tag: string): Promise<Array<ClashOfClansWarlog>> => this.warlog(tag),
			find: (name: string): Promise<Array<ClashOfClansBaseClan>> => this.find(name),
			currentWar: (tag: string): Promise<ClashOfClansCurrentWar> => this.currentWar(tag),
			get: (tag: string): Promise<ClashOfClansModifiedClan | ClashOfClansBaseClan> => this.clan(tag),
			members: (tag: string): Promise<Array<ClashOfClansMember>> => this.members(tag),
			capitalRaidSeasons: (tag: string): Promise<Array<ClashOfClansCapitalRaidSeason>> => this.capitalRaidSeasons(tag),
		};

		this.players = {
			get: (tag: string) => this.player(tag),
		};

		this.leagues = {
			capitalLeagues: this.capitalLeagues,
			capitalLeague: this.capitalLeague,
			leagues: this.idk2,
			get: this.league,
			leagueSeason: this.leagueSeason,
			season: this.season,
			warLeague: this.warLeague,
			warLeagues: this.warLeagues,
		};

		this.rankings = {
			clans: this.clanRankings,
			players: this.playerRankings,
			locations: this.locations,
			location: this.location,
		};

		this.goldpass = {
			current: this.currentSeason,
		};

		this.esports = {};

		this.labels = {
			players: this.playerLabels,
			clans: this.clanLabels,
		};
	}

	// Clans

	/**
	 *  Retrieve information about a clan's current clan war league group.
	 * @param {string} tag
	 * @returns something
	 */
	private async leagueGroup<T>(tag: string): Promise<T> {
		return await this.cocFetch('clans', { tag, subdomain: 'currentwar/leaguegroup' });
	}

	/**
	 *  Retrieve information about individual clan war league war.
	 * @param {string} tag
	 * @returns something
	 */
	private async leagueWar<T>(tag: string): Promise<T> {
		return await this.cocFetch('clanwarleagues', { predomain: 'wars', tag });
	}

	/**
	 *  Retrieve clan's clan war log.
	 * @param {string} tag
	 * @returns something
	 */
	private async warlog(tag: string) {
		const response: Record<'items', Array<ClashOfClansWarlog>> = await this.cocFetch('clans', {
			tag,
			subdomain: 'warlog',
		});

		return response?.items || response;
	}

	/**
	 *  Search clans by name.
	 * @param {string} name
	 * @returns something
	 */
	private async find(name: string) {
		// TODO - Add all query options.
		const response: Record<'items', Array<ClashOfClansBaseClan>> = await this.cocFetch('clans', { name });

		return response?.items || response;
	}

	/**
	 *  Retrieve information about the clan's current clan war
	 * @param {string} tag
	 * @returns something
	 */
	private async currentWar<T>(tag: string): Promise<T> {
		return await this.cocFetch('clans', { tag, subdomain: 'currentwar' });
	}

	/**
	 *  Get clan information
	 * @param tag
	 * @returns something
	 */
	private async clan(tag: string) {
		const clan: ClashOfClansBaseClan = await this.cocFetch('clans', { tag });

		if (!clan?.tag) return clan;

		const modifiedClan = this.modifyClan(clan);

		return modifiedClan;
	}

	/**
	 *  List clan members.
	 * @param {string} tag
	 * @returns something
	 */
	private async members<T extends Record<string, Array<ClashOfClansMember>>>(tag: string) {
		const response: T = await this.cocFetch('clans', { tag, subdomain: 'members' });

		return response?.items || response;
	}

	/**
	 *  Retrieve clan's capital raid seasons
	 * @param {string} tag
	 * @returns something
	 */
	private async capitalRaidSeasons<T extends Record<string, Array<ClashOfClansCapitalRaidSeason>>>(tag: string) {
		const response: T = await this.cocFetch('clans', { tag, subdomain: 'capitalraidseasons' });

		return response?.items || response;
	}

	// Players

	/**
	 *
	 * @param {string} tag
	 * @returns something
	 */
	private async player(tag: string) {
		return await this.cocFetch('players', { tag });
	}

	// Leagues

	private async capitalLeagues() {}
	private async idk2() {} // leagues
	private async leagueSeason() {}
	private async capitalLeague() {}
	private async league() {}
	private async season() {}
	private async warLeague() {}
	private async warLeagues() {}

	// Rankings

	private async clanRankings() {}
	private async playerRankings() {}
	private async locations() {}
	private async location() {}

	// Goldpass

	private async currentSeason() {}

	// Esports

	// Labels

	private async playerLabels() {}
	private async clanLabels() {}

	// Util

	/**
	 *
	 * @param domain
	 * @param options
	 * @returns
	 */
	private async cocFetch<T>(domain: GameDomains, options: FetchOptions): Promise<T> {
		return await this.fetch('Clash of Clans', domain, options);
	}

	private async modifyClan(clan: ClashOfClansBaseClan, baseClan: boolean = false): Promise<ClashOfClansModifiedClan> {
		const tag = clan.tag;

		const warlog = await this.warlog(tag),
			capitalRaidSeasons = (await this.capitalRaidSeasons(tag)) as any;

		const modifiedClan: ClashOfClansModifiedClan = {
			profile: {
				tag: clan.tag,
				name: clan.name,
				description: clan.description,
				location: clan.location,
				language: clan.chatLanguage,
				type: clan.type,
				friendly: clan.isFamilyFriendly,
				badgeURLs: clan.badgeUrls,
			},
			stats: {
				level: clan.clanLevel,
			},
			homeVillage: {
				trophies: clan.clanPoints,
				requiredTrophies: clan.requiredTrophies,
				requiredTownhall: clan.requiredTownhallLevel,
			},
			builderVillage: {
				trophies: clan.clanVersusPoints,
				requiredTrophies: clan.requiredTrophies,
			},
			capitalVillage: {
				capitalHall: clan.clanCapital.capitalHallLevel,
				districts: clan.clanCapital.districts,
				trophies: clan.clanCapitalPoints,
				league: clan.capitalLeague,
				log: capitalRaidSeasons,
			},
			war: {
				frequency: clan.warFrequency,
				wins: clan.warWins,
				ties: clan.warTies,
				losses: clan.warLosses,
				publicLog: clan.isWarLogPublic,
				league: clan.warLeague,
				log: warlog,
			},
			members: {
				count: clan.members,
				list: clan.memberList,
			},
			labels: clan.labels,
		};

		if (baseClan) modifiedClan.baseClan = clan;

		return modifiedClan;
	}
}
