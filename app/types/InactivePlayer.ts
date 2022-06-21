import { Player } from "./Player";
import { Team } from "./Team";

export type InactivePlayer = {
  isEmptySlot: boolean;
  position: string;
  player?: Player;
  isFreeAgent?: boolean;
  isByeWeek?: boolean;
  severity?: string;
  reason?: string;
};

export type InactivePlayerTeam = {
  team: Team;
  inactivePlayers: InactivePlayer[];
};
