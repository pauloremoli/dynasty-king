import { League } from "./Team";

export type Player = {
  player: string;
  pos: string;
  team: string;
  age?: string;
  value_1qb?: number;
  value_2qb?: number;
  fp_id?: string;
  fleaflickerId?: number;
};

export type PlayerTeam = {
  player: Player;
  availableInLeague: League[];
}