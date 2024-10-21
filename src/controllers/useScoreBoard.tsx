import { useState } from 'react'
import { Match, MatchWithoutId } from '../types/Match'
import generateId from '../utils/generateId'
import { sortMatchesByScoreAndTime } from '../utils/matchesSorter'

const mockMatch: MatchWithoutId = {
    awayTeam: 'Belarus', 
    homeTeam: 'Germany', 
    homeTeamScore: 4, 
    awayTeamScore: 5,
    startTime: new Date()
}

const useScoreBoard = () => {
    const [matches, setMatches] = useState<Match[]>([{ ...mockMatch, id: generateId(mockMatch) }])

    const onAddNewMatch = (newMatch: Match) => {
        setMatches(prev => [...prev, newMatch])
    }

    const onUpdateMatch = (updatedMatch: Match) => {
        setMatches(prev => [...prev.filter(match => match.id !== updatedMatch.id), updatedMatch])
    }

    const onFinishMatch = (removedId: string) => {
        setMatches(prev => prev.filter(match => match.id !== removedId))
    }

    return {
        matches: sortMatchesByScoreAndTime(matches),
        onUpdateMatch,
        onFinishMatch,
        onAddNewMatch
    }
}

export default useScoreBoard