export type Match = {
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeTeamScore: number;
    awayTeamScore: number;
    startTime: Date;
}

export type MatchWithoutId = Omit<Match, 'id'>