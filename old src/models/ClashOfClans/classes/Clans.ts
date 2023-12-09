import { Games } from "../../../data/Games.js";
import * as Tools from "../../Tools.js";
import { Guild, RawClan } from "../interfaces/Clan.js";

export default class Clans {
  #options: any;

  constructor(options: any) {
    this.#options = options;

    this.find = this.find;

    this.warLeagues = this.warLeagues;

    this.leagueGroup = this.leagueGroup;

    this.currentWar = this.currentWar;

    this.members = this.members;

    this.capitalRaidSeasons = this.capitalRaidSeasons;

    return this;
  }

  async find(tag: string, raw: boolean = false) {
    const rawClan: RawClan = await this.#fetch("clans", { tag });

    let i = 0;

    rawClan.memberList.map((member) => (i += member.donations));

    const profile = {
        tag: rawClan.tag,
        name: rawClan.name,
        description: rawClan.description,
        level: rawClan.clanLevel,
        badge: rawClan.badgeUrls,
        labels: rawClan.labels,
        location: rawClan.location,
        language: rawClan.chatLanguage,
        type: rawClan.type,
      },
      war = {
        frequency: rawClan.warFrequency,
        streak: rawClan.warWinStreak,
        wins: rawClan.warWins,
        ties: rawClan.warTies,
        losses: rawClan.warLosses,
        publicLog: rawClan.isWarLogPublic,
        league: rawClan.warLeague,
      },
      members = {
        count: rawClan.members,
        list: rawClan.memberList,
      },
      homeBase = {
        trophies: rawClan.clanPoints,
        requirements: {
          townHall: rawClan.requiredTownhallLevel,
          trophies: rawClan.requiredTrophies,
        },
        season: {
          donations: i,
        },
      },
      builderBase = {
        trophies: rawClan.clanVersusPoints,
        requirements: {
          trophies: rawClan.requiredVersusTrophies,
        },
      },
      capitalBase = {
        level: rawClan.clanCapital.capitalHallLevel,
        districts: rawClan.clanCapital.districts,
      },
      guild: Guild = {
        profile,
        war,
        members,
        homeBase,
        builderBase,
        capitalBase,
      };

    if (raw) return { modified: guild, raw: rawClan };
    else return guild;
  }

  warLeagues(tag: string, raw: boolean = false) {
    "/clanwarleagues/wars/{warTag}";
  }

  leagueGroup(tag: string, raw: boolean = false) {
    "/clans/{clanTag}/currentwar/leaguegroup";
  }

  currentWar(tag: string, raw: boolean = false) {
    "/clans/{clanTag}/currentwar";
  }

  members(tag: string, raw: boolean = false) {
    "/clans/{clanTag}/members";
  }

  capitalRaidSeasons(tag: string, raw: boolean = false) {
    "/clans/{clanTag}/capitalraidseasons";
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
