import { Achievement, Label, League, URLS } from "./Build.js";
import { Hero, Spell, Troop, Unit } from "./Troops.js";
import { Clan } from "./Clan.js";

export interface RawPlayer {
  tag: string;
  name: string;
  townHallLevel: number;
  townHallWeaponLevel: number;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  warStars: number;
  attackWins: number;
  defenseWins: number;
  builderHallLevel: number;
  versusTrophies: number;
  bestVersusTrophies: number;
  versusBattleWins: number;
  role: "leader" | "coLeader" | "admin" | "member";
  warPreference: "in" | "out";
  donations: number;
  donationsReceived: number;
  clanCapitalContributions: number;
  clan: Clan;
  league: League;
  achievements: Array<Achievement>;
  versusBattleWinCount: number;
  labels: Array<Label>;
  heroes: Array<Hero>;
  spells: Array<Spell>;
  troops: Array<Troop>;
}

export interface ModifiedPlayer {
  profile: {
    tag: string;
    name: string;
    level: number;
    war: {
      stars: number;
      status: "in" | "out";
    };
    achievementStars: number;
    contributions: number;
  };
  homeBase: {
    level: number;
    weaponLevel: number;
    trophies: number;
    trophiesRecord: number;
    wins: number;
    league: League;
  };
  builderBase: {
    level: number;
    trophies: number;
    trophiesRecord: number;
    wins: number;
  };
  guild: {
    tag: string;
    name: string;
    level: number;
    role: "leader" | "coLeader" | "admin" | "member";
    badge: URLS;
  };
  season: {
    wins: number;
    defenses: number;
    donations: number;
    donationsReceived: number;
  };
  units: Array<Unit>;
  achievements: Array<Achievement>;
}
