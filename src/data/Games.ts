export enum Games {
	ClashOfClans = "ClashOfClans",
	ClashRoyale = "ClashRoyale",
	BrawlStars = "BrawlStars",
	CoC = "ClashOfClans",
	CR = "ClashRoyale",
	BS = "BrawlStars",
	"coc" = "ClashOfClans",
	"cr" = "ClashRoyale",
	"bs" = "BrawlStars",
	"clashofclans" = "ClashOfClans",
	"clashroyale" = "ClashRoyale",
	"brawlstars" = "BrawlStars",
}

export enum FormattedGames {
	ClashOfClans = "Clash Of Clans",
	ClashRoyale = "Clash Royale",
	BrawlStars = "Brawl Stars",
}

export interface Game {
	clashOfClans?: string;
	clashRoyale?: string;
	brawlStars?: string;
}
