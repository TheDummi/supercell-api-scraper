export interface Games {
	ClashOfClans?: string;
	ClashRoyale?: string;
	BrawlStars?: string;
}

export interface Settings {
	fetchAll?: boolean; // Whether to fetch all tags related to a fetch.
}

export enum Setting {
	fetchAll = "fetchAll",
}

export const Tokens: Games = {};

export const Options: Settings = {};
