import React from 'react'
import { createPortal } from "react-dom"

import ScoreBoard from '../../components/ScoreBoard'
import useScoreBoard from '../../controllers/useScoreBoard'
import './MainPage.css'
import Button from '../../components/Button'
import MatchPopup from '../../components/MatchPopup'
import useMatchModal from '../../controllers/useMatchModal'
import { MATCH_MODAL_MODE } from '../../constants/matchModalModes'
import { Match } from '../../types/Match'


const MainPage = () => {
    const { matches, onUpdateMatch, onFinishMatch, onAddNewMatch } = useScoreBoard()
    const { isModalOpened, setModalOpen, setModalMode, modalMode, modalMatch, setModalMatch } = useMatchModal()

    const handleAddNewMatchClick = () => {
        setModalOpen(true)
        setModalMode(MATCH_MODAL_MODE.ADD)
    }

    const handleUpdateMatchClick = (matchToUpdate: Match) => {
        setModalMode(MATCH_MODAL_MODE.EDIT)
        setModalMatch(matchToUpdate)
        setModalOpen(true)
    }

    const handleAddNewMatch = (newMatch: Match) => {
        onAddNewMatch(newMatch);
        setModalOpen(false)
    }
    
    const handleUpdateMatch = (updatedMatch: Match) => {
        onUpdateMatch(updatedMatch);
        setModalOpen(false)
    }
    
    return (
        <>
            <div className="main-page__container">
                <Button className={'add-match-button'} title={'Add new Match'} onClick={handleAddNewMatchClick}></Button>
                <ScoreBoard 
                    matches={matches}
                    onUpdateClick={handleUpdateMatchClick}
                    onFinishClick={onFinishMatch}
                />
            </div>
            {createPortal(
                <MatchPopup 
                    match={modalMatch}
                    isOpened={isModalOpened}
                    mode={modalMode}
                    onAddNewMatch={handleAddNewMatch}
                    onUpdateMatch={handleUpdateMatch}
                    closeModal={() => setModalOpen(false)}
                />,
                document.body
            )}
        </>
    )
}

export default MainPage