import * as BrawlStars from "../data/BrawlStars/interfaces.js";
import * as ClashOfClans from "../data/ClashOfClans/interfaces.js";
import { Village } from "../data/ClashOfClans/types.js";

export interface ClashOfClansTroop {
	name: string;
	level: number;
	maxLevel: number;
	village: Village.Home | Village.BuilderBase;
}

export interface ClashOfClansPlayerData {
	tag: string;
	name: string;
	townHallLevel: number;
	townHallWeaponLevel: number;
	expLevel: number;
	trophies: number;
	bestTrophies: number;
	warStars: number;
	attackWins: number;
	defenseWins: number;
	builderHallLevel: number;
	versusTrophies: number;
	bestVersusTrophies: number;
	versusBattleWins: number;
	role: string;
	warPreference: "in" | "out";
	donations: number;
	donationsReceived: number;
	clanCapitalContributions: number;
	clan: {
		tag: string;
		name: string;
		clanLevel: number;
		badgeUrls: ClashOfClans.URLS;
	};
	league: {
		id: number;
		name: string;
		iconUrls: ClashOfClans.URLS;
	};
	achievements: Array<ClashOfClans.Achievement>;
	versusBattleWinCount: number;
	labels: Array<ClashOfClans.Label>;
	troops?: Array<ClashOfClansTroop>;
	heroes?: Array<ClashOfClansTroop>;
	spells?: Array<ClashOfClansTroop>;
}

/**
 * Interface for Clash of Clans modified data.
 */
export interface ClashOfClansModifiedPlayerData {
	player: ClashOfClans.Player;
	homeBase: ClashOfClans.HomeBase;
	builderBase: ClashOfClans.BuilderBase;
	guild: ClashOfClans.Clan;
	season: ClashOfClans.Season;
	units: Array<ClashOfClans.Troop>;
	achievements: Array<ClashOfClans.Achievement>;
}

export interface ClashOfClansClanData {
	tag: string;
	name: string;
	type: string;
	description: string;
	location: {
		id: number;
		name: string;
		isCountry: boolean;
		countryCode: string;
	};
	badgeUrls: ClashOfClans.URLS;
	clanLevel: number;
	clanPoints: number;
	clanVersusPoints: number;
	requiredTrophies: number;
	warFrequency: string;
	warWinStreak: number;
	warWins: number;
	warTies: number;
	warLosses: number;
	isWarLogPublic: boolean;
	warLeague: { id: number; name: string };
	members: 40;
	memberList: Array<ClashOfClans.Member>;
	labels: Array<ClashOfClans.Label>;
	requiredVersusTrophies: number;
	requiredTownhallLevel: number;
	clanCapital: {
		capitalHallLevel: number;
		districts: Array<{ id: number; name: string; districtHallLevel: number }>;
	};
	chatLanguage: { id: number; name: string; languageCode: string };
}

export interface ClashOfClansModifiedClanData {
	profile: {
		tag: string;
		name: string;
		level: number;
		type: string;
		description: string;
		location: {
			id: number;
			name: string;
			isCountry: boolean;
			countryCode: string;
			chatLanguage: { id: number; name: string; languageCode: string };
		};
		labels: Array<ClashOfClans.Label>;
		badgeUrls: ClashOfClans.URLS;
	};
	homeBase: {
		trophies: number;
		requirements: {
			trophies: number;
			townHall: number;
		};
	};
	builderBase: {
		trophies: number;
		requirements: {
			trophies: number;
		};
	};
	clanCapital: {
		level: number;
		districtCount: number;
		districts: Array<{ id: number; name: string; districtHallLevel: number }>;
	};
	war: {
		frequency: string;
		streak: number;
		wins: number;
		ties: number;
		losses: number;
		public: boolean;
		league: { id: number; name: string };
	};
	members: {
		count: number;
		list: Array<ClashOfClans.Member>;
	};
}

/**
 * Interface for Clash Royale modified data.
 */
export interface ClashRoyaleModification {}

export interface BrawlStarsPlayerData {}

export interface brawlStarsModifiedPlayerData {}

export interface BrawlStarsClubData {
	tag: string;
	name: string;
	description: string;
	type: string;
	badgeId: number;
	requiredTrophies: number;
	trophies: number;
	members: Array<BrawlStars.Member>;
}
/**
 * Interface for Brawl Stars modified data.
 */
export interface BrawlStarsModifiedClubData {
	profile: {
		tag: string;
		name: string;
		description: string;
		type: string;
		badgeId: number;
		trophies: number;
		requirements: {
			trophies: number;
		};
	};
	members: {
		count: number;
		list: Array<BrawlStars.Member>;
	};
}
