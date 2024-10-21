import { FunctionComponent, useCallback } from 'react';

import { Match } from '../../../types/Match';
import Button from '../../Button';

import './ScoreItem.css'

interface ScoreItemProps {
    match: Match
    onUpdateClick: (matchToUpdate: Match)=> void;
    onFinishClick: (id: string) => void;
}

const ScoreItem: FunctionComponent<ScoreItemProps> = ({ match, onUpdateClick, onFinishClick }) => {
    const handleUpdateClick = useCallback(() => {
        onUpdateClick(match)
    }, [onUpdateClick, match])

    const handleFinishMatchClick = useCallback(() => {
        onFinishClick(match.id)
    }, [onFinishClick, match.id])

    return (
        <div className='score__container'>
            <div className='team__container'>
                <span className='team-name'>{match.homeTeam}</span>
                <span className='team-score'>{match.homeTeamScore}</span>
            </div>
            -
            <div className='team__container'>
                <span className='team-score'>{match.awayTeamScore}</span>
                <span className='team-name'>{match.awayTeam}</span>
            </div>
            <Button 
                onClick={handleUpdateClick} 
                title={'Update Score'}
            />
            <Button
                onClick={handleFinishMatchClick} 
                title={'Finish Match'}
            />
        </div>
    )
}

export default ScoreItem;