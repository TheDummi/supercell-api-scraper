import { Games } from "../../../data/Games.js";
import { RawPlayer, ModifiedPlayer } from "../interfaces/Player.js";
import * as Tools from "../../Tools.js";
import { Hero, Spell, Troop, Unit } from "../interfaces/Troops.js";
import { Achievement } from "../interfaces/Build.js";
import troops from "../assets/troops.js";
import { Village } from "../assets/types.js";

export default class Players {
  #options: any;

  constructor(options: any) {
    this.#options = options;

    this.find = this.find;

    this.verifyToken = this.verifyToken;

    return this;
  }

  async find(tag: string, raw: boolean = false) {
    const rawPlayer: RawPlayer = await this.#fetch("players", { tag });

    let stars = 0;

    rawPlayer.achievements.map(
      (achievement: Achievement) => (stars += achievement.stars),
    );

    const profile = {
        tag: rawPlayer.tag,
        name: rawPlayer.name,
        level: rawPlayer.expLevel,
        war: {
          stars: rawPlayer.warStars,
          status: rawPlayer.warPreference,
        },
        achievementStars: stars,
        contributions: rawPlayer.clanCapitalContributions,
      },
      homeBase = {
        level: rawPlayer.townHallLevel,
        weaponLevel: rawPlayer.townHallWeaponLevel,
        trophies: rawPlayer.trophies,
        trophiesRecord: rawPlayer.bestTrophies,
        wins:
          rawPlayer.achievements.find(
            (achievement: Achievement) => achievement.name === "Conqueror",
          )?.value || 0,
        league: rawPlayer.league,
      },
      builderBase = {
        level: rawPlayer.builderHallLevel,
        trophies: rawPlayer.versusTrophies,
        trophiesRecord: rawPlayer.bestVersusTrophies,
        wins: rawPlayer.versusBattleWins,
      },
      guild = {
        tag: rawPlayer.clan.tag,
        name: rawPlayer.clan.name,
        level: rawPlayer.clan.clanLevel,
        badge: rawPlayer.clan.badgeUrls,
        role: rawPlayer.role,
      },
      season = {
        wins: rawPlayer.attackWins,
        defenses: rawPlayer.defenseWins,
        donations: rawPlayer.donations,
        donationsReceived: rawPlayer.donationsReceived,
      },
      units = [
        ...(rawPlayer.heroes || []),
        ...(rawPlayer.troops || []),
        ...(rawPlayer.spells || []),
      ].map((unit: Troop | Spell | Hero) => {
        const troop: Record<string, any> | undefined = troops.find(
          (troop) => troop.name === unit.name,
        );

        return {
          name: unit.name,
          level: {
            current: unit.level,
            limit:
              troop?.levels[rawPlayer.townHallLevel] ||
              troop?.levels[rawPlayer.builderHallLevel] ||
              null,
            max: unit.maxLevel,
          },
          resource: troop?.resource,
          type: troop?.type,
          village: troop?.village,
          progress: `${
            Math.floor((unit.level / unit.maxLevel) * 10000) / 100
          }%`,
        };
      }),
      achievements = rawPlayer.achievements,
      modifiedPlayer: ModifiedPlayer = {
        profile,
        homeBase,
        builderBase,
        guild,
        season,
        units,
        achievements,
      };

    if (raw) return { modified: modifiedPlayer, raw: rawPlayer };
    else return modifiedPlayer;
  }

  verifyToken(tag: string, raw: boolean = false) {
    "players/{playerTag}/verifyToken"; // POST
  }

  async #fetch(domain: string, options?: Record<string, string>) {
    if (!this.#options?.token)
      throw new Error(
        `To use this method for Clash of Clans you are required to have a valid token.`,
      );

    return await Tools.fetch(
      this.#options.token,
      Games.ClashOfClans,
      domain,
      options,
    );
  }
}
