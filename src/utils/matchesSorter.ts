import { Match } from "../types/Match"

export const sortMatchesByScoreAndTime = (matches: Match[]): Match[] =>  matches.sort((a, b) => {
    const totalScoreA = a.homeTeamScore + a.awayTeamScore;
    const totalScoreB = b.homeTeamScore + b.awayTeamScore;

    if (totalScoreA !== totalScoreB) {
        return totalScoreB - totalScoreA;
    } else {
        return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
    }
});