import { TotalValue } from '~/types/RosterValue';
import { Player } from "./Player";

export enum PlayerPosition {
    QB = "QB",
    RB = "RB",
    WR = "WR",
    TE = "TE"
  }


export type Roster = {
    teamName: string;
    teamId: number;
    players: Player[];
}

export type RosterValue = {
  roster: Roster;
  value: TotalValue;
}