export declare interface ClientOptions {
	ClashOfClans?: ClashOfClansOptions | null;
	ClashRoyale?: ClashRoyaleOptions | null;
	BrawlStars?: BrawlStarsOptions | null;
	config?: {
		debug?: boolean;
	};
}

export declare type ClashOfClansOptions = {
	token: string;
};
export declare type ClashRoyaleOptions = {
	token: string;
};
export declare type BrawlStarsOptions = {
	token: string;
};

export interface FetchOptions {
	predomain?: string;
	name?: string;
	tag?: string;
	subdomain?: string;
}
