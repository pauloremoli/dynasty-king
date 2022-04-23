export type SeasonStats = {
    wins: number,
    losses: number,
    ties?: number,
}

export type StatsPerYear = {
    year: number,
    rank: number,
    pointsFor: number,
    regularSeason: SeasonStats,
    postseason: SeasonStats
}

export type TeamStats = {
    id: number,
    name: string,
    logoUrl: string,
    statsPerYear? : StatsPerYear[],
    regularSeason: SeasonStats,
    postseason: SeasonStats
};