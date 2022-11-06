import * as BrawlStars from "../data/BrawlStars/interfaces.js";
import * as ClashOfClans from "../data/ClashOfClans/interfaces.js";
import * as ClashRoyale from "../data/ClashRoyale/interfaces.js";

/**
 * Interface for Clash of Clans player data.
 */
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
	troops?: Array<ClashOfClans.Troop>;
	heroes?: Array<ClashOfClans.Troop>;
	spells?: Array<ClashOfClans.Troop>;
}

/**
 * Interface for Clash of Clans modified player data.
 */
export interface ClashOfClansModifiedPlayerData {
	profile: ClashOfClans.Player;
	homeBase: ClashOfClans.HomeBase;
	builderBase: ClashOfClans.BuilderBase;
	guild: ClashOfClans.Clan;
	season: ClashOfClans.Season;
	units: Array<ClashOfClans.Troop>;
	achievements: Array<ClashOfClans.Achievement>;
}

/**
 * Interface for Clash of Clans clan data.
 */
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

/**
 * Interface for Clash of Clans modified clan data.
 */
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
 * Interface for Clash Royale Player data.
 */
export interface ClashRoyalePlayerData {
	tag: string;
	name: string;
	expLevel: number;
	trophies: number;
	bestTrophies: number;
	wins: number;
	losses: number;
	battleCount: number;
	threeCrownWins: number;
	challengeCardsWon: number;
	challengeMaxWins: number;
	tournamentCardsWon: number;
	tournamentBattleCount: number;
	role: string;
	donations: number;
	donationsReceived: number;
	totalDonations: number;
	warDayWins: number;
	clanCardsCollected: number;
	clan: { tag: string; name: string; badgeId: number };
	arena: { id: number; name: string };
	leagueStatistics?: {
		currentSeason: { trophies: number };
		previousSeason: {
			id: string;
			rank: number;
			trophies: number;
			bestTrophies: number;
		};
		bestSeason: { id: string; rank: number; trophies: number };
	};
	badges: Array<ClashRoyale.Badge>;
	achievements: Array<ClashRoyale.Achievement>;
	cards: Array<ClashRoyale.Card>;
	currentDeck: Array<ClashRoyale.Card>;
	currentFavouriteCard: ClashRoyale.Card;
	expPoints: number;
	totalExpPoints: number;
}

/**
 * Interface for Clash Royale modified player data.
 */
export interface ClashRoyaleModifiedPlayerData {
	profile: {
		tag: string;
		name: string;
		level: number;
		xp: number;
		totalXp: number;
		arena: { id: number; name: string };
		trophies: number;
		trophyRecord: number;
	};
	battle: {
		wins: number;
		losses: number;
		count: number;
		threeCrowns: number;
	};
	guild: {
		tag: string;
		name: string;
		badgeId: number;
		role: string;
		war: {
			wins: number;
			cards: number;
		};
	};
	season: {
		previous: {
			id?: string;
			rank?: number;
			trophies?: number;
			trophyRecord?: number;
		};
		current: {
			trophies?: number;
			donations: number;
			donationsReceived: number;
			deck: Array<ClashRoyale.Card>;
		};
		record: { id?: string; rank?: number; trophies?: number };
	};
	events: {
		challenge: {
			cards: number;
			streak: number;
		};
		tournament: {
			cards: number;
			battles: number;
		};
	};
	badges: Array<ClashRoyale.Badge>;
	units: {
		cards: { count: number; list: Array<ClashRoyale.Card> };
		favouriteCard: ClashRoyale.Card;
	};
	achievements: Array<ClashRoyale.Achievement>;
}
/**
 * Interface for Clash Royale clan data
 */
export interface ClashRoyaleClanData {}

/**
 * Interface for Clash Royale modified clan data
 */
export interface ClashRoyaleModifiedClanData {}

/**
 * Interface for Brawl Stars player data.
 */
export interface BrawlStarsPlayerData {}

/**
 * Interface for Brawl Stars modified player data.
 */
export interface BrawlStarsModifiedPlayerData {}

/**
 * Interface for Brawl Stars club data.
 */
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
 * Interface for Brawl Stars modified club data.
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
