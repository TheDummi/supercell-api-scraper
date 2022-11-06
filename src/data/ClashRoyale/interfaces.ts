export interface URLS {
	tiny?: string;
	small?: string;
	medium?: string;
	large?: string;
}

export interface Card {
	name: string;
	id: number;
	level: number;
	maxLevel: number;
	count: number;
	iconUrls: URLS;
}

export interface Badge {
	name: string;
	level: number;
	maxLevel: number;
	progress: number;
	target: number;
	iconUrls: URLS;
}

export interface Achievement {
	name: string;
	stars: number;
	value: number;
	target: number;
	info: string;
	completionInfo: string | null;
}
