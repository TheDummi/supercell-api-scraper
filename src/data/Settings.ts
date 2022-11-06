export interface Games {
	ClashOfClans?: string;
	ClashRoyale?: string;
	BrawlStars?: string;
}

export interface Settings {
	fetchAll?: boolean; // Whether to fetch all tags related to a fetch.
	logging?: boolean; //Whether to log requests or not.
}

export enum Setting {
	fetchAll = "fetchAll",
	logging = "logging",
}

export const Tokens: Games = {};

export const Options: Settings = {};
