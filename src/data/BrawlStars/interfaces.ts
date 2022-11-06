export interface Member {
	tag: string;
	name: string;
	nameColor: string;
	role: string;
	trophies: number;
	icon: object;
}

export interface Brawler {
	id: number;
	name: string;
	power: number;
	rank: number;
	trophies: number;
	highestTrophies: number;
	gears: Array<{ id: number; name: string }>;
	starPowers: Array<{ id: number; name: string }>;
	gadgets: Array<{ id: number; name: string }>;
}
