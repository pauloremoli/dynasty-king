export enum PlayerPosition {
    QB = "QB",
    RB = "RB",
    WR = "WR",
    TE = "TE"
  }
  

export type Player = {
    id: number;
    name: string;
    position: PlayerPosition;
}

export type Roster = {
    teamName: string;
    teamId: number;
    players: Player[];
}