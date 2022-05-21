import { TotalValue } from '~/types/RosterValue';
import { Pick } from './Picks';
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
    picks: Pick[];
}

export type RosterValue = {
  roster: Roster;
  value: TotalValue;
}