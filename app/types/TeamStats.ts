export type Standings = {
  wins: number;
  losses: number;
  ties?: number;
};

export type StatsPerYear = {
  year: number;
  rank: number;
  pointsFor: number;
  regularSeason: Standings;
  postseason: Standings;
};

export type TeamStats = {
  id: number;
  name: string;
  owner: string;
  logoUrl: string;
  statsPerYear?: StatsPerYear[];
  regularSeason: Standings;
  postseason: Standings;
};

export type H2HStats = {
  teamId: number;
  teamName: string;
  standings: Standings;
};
