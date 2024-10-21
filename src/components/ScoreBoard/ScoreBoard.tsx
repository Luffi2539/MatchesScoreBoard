import { FunctionComponent } from 'react'

import './ScoreBoard.css'
import ScoreItem from './ScoreItem'
import { Match } from '../../types/Match';

interface ScoreBoardProps {
    matches: Match[]
    onUpdateClick: (matchToUpdate: Match)=> void;
    onFinishClick: (id: string) => void;
}

const ScoreBoard: FunctionComponent<ScoreBoardProps> = ({
    matches,
    onUpdateClick,
    onFinishClick
}) => {
    return (
        <div className='scoreboard__container'>
            {matches.map(match => <ScoreItem 
                onUpdateClick={onUpdateClick}
                onFinishClick={onFinishClick}
                key={match.id} 
                match={match}
            />)}
        </div>
    )
}

export default ScoreBoard