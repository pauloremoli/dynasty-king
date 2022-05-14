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