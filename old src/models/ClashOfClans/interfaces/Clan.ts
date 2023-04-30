import { Label, URLS } from "./Build.js";

interface Member {
	tag: string;
	name: string;
	role: string;
	expLevel: number;
	league: object;
	trophies: number;
	versusTrophies: number;
	clanRank: number;
	previousClanRank: number;
	donations: number;
	donationsReceived: number;
}

export interface Clan {
	tag: string;
	name: string;
	clanLevel: number;
	badgeUrls: URLS;
}

export interface RawClan {
	tag: string;
	name: string;
	type: "open" | "inviteOnly" | "closed";
	description: string;
	location: {
		id: number;
		name: string;
		isCountry: boolean;
		countryCode: string;
	};
	badgeUrls: URLS;
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
	members: number;
	memberList: Array<Member>;
	labels: Array<Label>;
	requiredVersusTrophies: number;
	requiredTownhallLevel: number;
	clanCapital: {
		capitalHallLevel: number;
		districts: Array<object>;
	};
	chatLanguage: { id: number; name: string; languageCode: string };
}

export interface Guild {
	profile: {
		tag: string;
		name: string;
		description: string;
		level: number;
		badge: URLS;
		labels: Array<Label>;
		location: {
			id: number;
			name: string;
			isCountry: boolean;
			countryCode: string;
		};
		language: { id: number; name: string; languageCode: string };
		type: string;
	};
	war: {
		frequency: string;
		streak: number;
		wins: number;
		ties: number;
		losses: number;
		publicLog: boolean;
		league: { id: number; name: string };
	};
	members: {
		count: number;
		list: Array<Member>;
	};
	homeBase: {
		trophies: number;
		requirements: {
			trophies: number;
			townHall: number;
		};
		season: {
			donations: number;
		};
	};
	builderBase: {
		trophies: number;
		requirements: {
			trophies: number;
		};
	};
	capitalBase: {
		level: number;
		districts: Array<object>;
	};
}
