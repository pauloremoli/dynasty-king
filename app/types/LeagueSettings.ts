import { Position } from "~/types/Position";
import { Format } from "./Format";

export enum ScoringCategory {
  RECEPTION = "Reception",
  RUSH_ATTEMPT = "Rush Attempt",
  PASSING_TD = "Passing TD",
}

export type ScoringRule = {
  category: ScoringCategory;
  points: number;
  applyTo: Position[];
};

export type ScoringRules = {
  scoringRules: ScoringRule[];
  isHalfPPR: boolean;
  isPPR: boolean;
  isTEPremium: boolean;
  pprTE: number;
}

export type LeagueSettings = {
  format: Format;
  numberOfPlayoffTeams: number;
  firstWeek: number;
  lastWeek: number;
  scoringRules: ScoringRules;
};
