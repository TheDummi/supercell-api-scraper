import { Resource, TroopType, Village } from "../types/ClashOfClans.js";

/**
 * Interface for a Clash of Clans troop.
 */
export interface ClashOfClansTroop {
	name?: string;
	currentLevel?: number;
	currentMaxLevel?: number;
	maxLevel?: number;
	level?: number;
	type?: string;
	resource?: Resource;
	village?: string;
	levels?: Record<string, number>;
}

/**
 * Interface for a Clash Royale card.
 */
export interface ClashRoyaleCard {}

/**
 * Interface for a Brawl Stars Brawler
 */
export interface BrawlStarsBrawler {}
