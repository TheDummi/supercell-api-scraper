import { ClashOfClansTroop } from "./Troops.js";

/**
 * Interface for Clash of Clans modified data.
 */
export interface ClashOfClansModification {
	troops?: Array<object>;
	heroes?: Array<object>;
	spells?: Array<object>;
	units: Array<ClashOfClansTroop>;
	townHallLevel?: number;
	builderHallLevel?: number;
}

/**
 * Interface for Clash Royale modified data.
 */
export interface ClashRoyaleModification {}

/**
 * Interface for Brawl Stars modified data.
 */
export interface BrawlStarsModification {}
