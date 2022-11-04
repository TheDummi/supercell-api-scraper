import * as ClashOfClans from "../data/ClashOfClans/interfaces.js";
import { Village } from "../data/ClashOfClans/types.js";

export interface ClashOfClansTroop {
	name: string;
	level: number;
	maxLevel: number;
	village: Village.Home | Village.BuilderBase;
}

export interface ClashOfClansData {
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
export interface ClashOfClansModifiedData {
	player: ClashOfClans.Player;
	homeBase: ClashOfClans.HomeBase;
	builderBase: ClashOfClans.BuilderBase;
	guild: ClashOfClans.Clan;
	season: ClashOfClans.Season;
	units: Array<ClashOfClans.Troop>;
	achievements: Array<ClashOfClans.Achievement>;
}

/**
 * Interface for Clash Royale modified data.
 */
export interface ClashRoyaleModification {}

/**
 * Interface for Brawl Stars modified data.
 */
export interface BrawlStarsModification {}
