export interface Unit {
	name: string;
	level: {
		current: number;
		limit: number;
		max: number;
	};
	resource: string;
	type: string;
	village: string;
	progress: string;
}

export interface Hero {
	name: string;
	level: number;
	maxLevel: number;
	village: "home" | "builderBase";
}

export interface Spell {
	name: string;
	level: number;
	maxLevel: number;
	village: "home" | "builderBase";
}

export interface Troop {
	name: string;
	level: number;
	maxLevel: number;
	village: "home" | "builderBase";
}
