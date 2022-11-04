import { Resource, Village } from "./types.js";

export interface Player {
	tag: string;
	name: string;
	level: number;
	warStatus: "in" | "out";
	warStars: number;
	labels: Array<Label>;
}

export interface HomeBase {
	level: number;
	weaponLevel: number;
	trophies: number;
	trophyRecord: number;
	wins: number;
}

export interface BuilderBase {
	level: number;
	trophies: number;
	trophyRecord: number;
	wins: number;
}

export interface Clan {
	tag: string;
	name: string;
	level: number;
	role: string;
	contributions: number;
	iconUrls: URLS;
}

export interface Season {
	wins: number;
	defenses: number;
	donations: number;
	donationsReceived: number;
	league?: { id: number; name: string; iconUrls: URLS };
}

export interface Troop {
	currentLevel: number;
	currentMaxLevel: number;
	type: string;
	resource: Resource;
	levels?: Record<string, number>;
}

export interface Achievement {
	name: string;
	stars: number;
	value: number;
	target: number;
	info: string;
	completionInfo: string;
	village: Village.Home | Village.BuilderBase;
}

export interface URLS {
	tiny?: string;
	small?: string;
	medium?: string;
	large?: string;
}
export interface Label {
	id: number;
	name: string;
	iconUrls: URLS;
}
