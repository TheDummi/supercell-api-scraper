export interface ClashOfClansLeagueGroup {}

export interface ClashOfClansLeagueWar {}

export interface ClashOfClansWarlog {
	result: ClashOfClansResult;
	endTime: Date;
	teamSize: ClashOfClansWarSize;
	attacksPerMember: 1 | 2;
	clan: ClashOfClansWarLogClan;
	opponent: ClashOfClansWarLogOpponent;
}

export interface ClashOfClansCurrentWar {
	state: 'notInWar';
	clan: Omit<ClashOfClansWarLogClan, 'expEarned'>;
	opponent: ClashOfClansWarLogOpponent;
}

export interface ClashOfClansBaseClan {
	tag: string;
	name: string;
	type: ClashOfClansClanType;
	description: string;
	location: {
		id: number;
		name: string;
		isCountry: boolean;
		countryCode: string;
	};
	isFamilyFriendly: false;
	badgeUrls: ClashOfClansBadgeUrls;
	clanLevel: number;
	clanPoints: number;
	clanVersusPoints: number;
	clanCapitalPoints: number;
	capitalLeague: ClashOfClansCapitalLeague;
	requiredTrophies: number;
	warFrequency: 'always';
	warWinStreak: number;
	warWins: number;
	warTies: number;
	warLosses: number;
	isWarLogPublic: boolean;
	warLeague: ClashOfClansWarLeague;
	members: number;
	memberList: Array<ClashOfClansMember>;
	labels: Array<ClashOfClansLabel>;
	requiredVersusTrophies: number;
	requiredTownhallLevel: number;
	clanCapital: {
		capitalHallLevel: number;
		districts: Array<ClashOfClansCapitalDistrict>;
	};
	chatLanguage: ClashOfClansLanguage;
}

export interface ClashOfClansCapitalRaidSeason {
	state: 'ended' | 'ongoing';
	startTime: Date;
	endTime: Date;
	capitalTotalLoot: number;
	raidsCompleted: number;
	totalAttacks: number;
	enemyDistrictsDestroyed: number;
	offensiveReward: number;
	defensiveReward: number;
	members?: Array<ClashOfClansCapitalRaider>;
	attackLog: Array<ClashOfClansCapitalAttacker>;
	defenseLog: Array<ClashOfClansCapitalDefender>;
}

export interface ClashOfClansModifiedClan {
	profile: {
		tag: string;
		name: string;
		description: string;
		location: ClashOfClansLocation;
		language: ClashOfClansLanguage;
		type: ClashOfClansClanType;
		friendly: boolean;
		badgeURLs: ClashOfClansBadgeUrls;
	};
	stats: {
		level: number;
	};
	homeVillage: {
		trophies: number;
		requiredTrophies: number;
		requiredTownhall: number;
	};
	builderVillage: {
		trophies: number;
		requiredTrophies: number;
	};
	capitalVillage: {
		capitalHall: number;
		districts: Array<ClashOfClansCapitalDistrict>;
		trophies: number;
		league: ClashOfClansCapitalLeague;
		log: Array<ClashOfClansCapitalRaidSeason>;
	};
	war: {
		frequency: 'always';
		wins: number;
		ties: number;
		losses: number;
		publicLog: boolean;
		league: ClashOfClansWarLeague;
		log: Array<ClashOfClansWarlog>;
	};
	members: {
		count: number;
		list: Array<ClashOfClansMember>;
	};
	labels: Array<ClashOfClansLabel>;
	baseClan?: ClashOfClansBaseClan;
}

export interface ClashOfClansWarLogClan extends Pick<ClashOfClansBaseClan, 'tag' | 'name' | 'badgeUrls' | 'clanLevel'> {
	attacks: number;
	stars: number;
	destructionPercentage: number;
	expEarned: number;
}

export interface ClashOfClansWarLogOpponent
	extends Pick<ClashOfClansBaseClan, 'tag' | 'name' | 'badgeUrls' | 'clanLevel'> {
	stars: number;
	destructionPercentage: number;
}

export interface ClashOfClansMember {
	tag: string;
	name: string;
	role: 'member' | 'admin' | 'coLeader' | 'leader';
	expLevel: number;
	league: Pick<ClashOfClansWarLeague, 'id' | 'name'> | Record<'iconUrls', ClashOfClansBadgeUrls>;
	trophies: number;
	versusTrophies: number;
	clanRank: number;
	previousClanRank: number;
	donations: number;
	donationsReceived: number;
	playerHouse: ClashOfClansMemberHouse;
}

export interface ClashOfClansCapitalRaider {
	tag: string;
	name: string;
	attacks: 1 | 2 | 3 | 4 | 5 | 6;
	attackLimit: 5 | 6;
	bonusAttackLimit: 0 | 1;
	capitalResourcesLooted: number;
}

export interface ClashOfClansCapitalAttacker {
	defender: {
		tag: string;
		name: string;
		level: number;
		badgeUrls: ClashOfClansBadgeUrls;
	};
	attackCount: number;
	districtCount: number;
	districtsDestroyed: number;
	districts: Array<ClashOfClansCapitalAttackerDistrict>;
}

export interface ClashOfClansCapitalDefender {
	attacker: {
		tag: string;
		name: string;
		level: number;
		badgeUrls: ClashOfClansBadgeUrls;
	};
	attackCount: number;
	districtCount: number;
	districtsDestroyed: number;
	districts: Array<ClashOfClansCapitalAttackerDistrict>;
}

export interface ClashOfClansCapitalAttackerDistrict {
	id: number;
	name: string;
	districtHallLevel: number;
	destructionPercent: number;
	stars: number;
	attackCount: number;
	totalLooted: number;
	attacks?: Array<{
		attacker: { tag: string; name: string };
		destructionPercent: number;
		stars: number;
	}>;
}

export interface ClashOfClansBadgeUrls {
	tiny?: URL;
	small?: URL;
	large?: URL;
	medium?: URL;
}

export interface ClashOfClansLabel {
	id: number;
	name: string;
	iconUrls: ClashOfClansBadgeUrls;
}

export interface ClashOfClansLocation {
	id: number;
	name: string;
	isCountry: boolean;
	countryCode: string;
}

export interface ClashOfClansLanguage {
	id: number;
	name: string;
	languageCode: string;
}

export interface ClashOfClansCapitalDistrict {
	id: number;
	name: string;
	districtHallLevel: number;
}

export interface ClashOfClansCapitalLeague {
	id: ClashOfClansLeagueId;
	name: ClashOfClansLeagueName;
}

export interface ClashOfClansWarLeague {
	id: ClashOfClansLeagueId;
	name: ClashOfClansLeagueName;
}

export interface ClashOfClansMemberHouse {
	elements: Array<{ type: string; id: number }>;
}

export type ClashOfClansLeagueName =
	| 'Unranked'
	| 'Bronze League III'
	| 'Bronze League II'
	| 'Bronze League I'
	| 'Silver League III'
	| 'Silver League II'
	| 'Silver League I'
	| 'Gold League III'
	| 'Gold League II'
	| 'Gold League I'
	| 'Crystal League III'
	| 'Crystal League II'
	| 'Crystal League I'
	| 'Master League III'
	| 'Master League II'
	| 'Master League I'
	| 'Champion League III'
	| 'Champion League II'
	| 'Champion League I'
	| 'Titan League III'
	| 'Titan League II'
	| 'Titan League I'
	| 'Legend League';

export type ClashOfClansLeagueId =
	| 29000000
	| 29000001
	| 29000002
	| 29000003
	| 29000004
	| 29000005
	| 29000006
	| 29000007
	| 29000008
	| 29000009
	| 29000010
	| 29000011
	| 29000012
	| 29000013
	| 29000014
	| 29000015
	| 29000016
	| 29000017
	| 29000018
	| 29000019
	| 29000020
	| 29000021
	| 29000022;

export type ClashOfClansClanType = 'open' | 'inviteOnly' | 'closed';

export type ClashOfClansWarSize = 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50;

export type ClashOfClansResult = 'win' | 'tie' | 'lose';
