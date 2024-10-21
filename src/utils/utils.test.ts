import { sortMatchesByScoreAndTime } from "./matchesSorter";

describe('utils tests', () => {
   it('should sort matches in particular order', () => {
    const matches = [
        { id: "1", homeTeam: "Mexico", awayTeam: "Canada", homeTeamScore: 0, awayTeamScore: 5, startTime: new Date("2024-10-20T14:00:00") },
        { id: "2", homeTeam: "Spain", awayTeam: "Brazil", homeTeamScore: 10, awayTeamScore: 2, startTime: new Date("2024-10-20T12:00:00") },
        { id: "3", homeTeam: "Germany", awayTeam: "France", homeTeamScore: 2, awayTeamScore: 2, startTime: new Date("2024-10-20T16:00:00") },
        { id: "4", homeTeam: "Uruguay", awayTeam: "Italy", homeTeamScore: 6, awayTeamScore: 6, startTime: new Date("2024-10-20T10:00:00") },
        { id: "5", homeTeam: "Argentina", awayTeam: "Australia", homeTeamScore: 3, awayTeamScore: 1, startTime: new Date("2024-10-20T15:00:00") }
    ];

    expect(sortMatchesByScoreAndTime(matches).map(match => match.id)).toStrictEqual(['2', '4', '1', '3', '5'])
   })
})