import React, { useCallback } from 'react'
import { createPortal } from "react-dom"

import ScoreBoard from '../../components/ScoreBoard'
import useScoreBoard from '../../controllers/useScoreBoard'
import Button from '../../components/Button'
import MatchPopup from '../../components/MatchPopup'
import useMatchModal from '../../controllers/useMatchModal'
import { MATCH_MODAL_MODE } from '../../constants/matchModalModes'
import { Match } from '../../types/Match'

import './MainPage.css'


const MainPage = () => {
    const { matches, onUpdateMatch, onFinishMatch, onAddNewMatch } = useScoreBoard()
    const { isModalOpened, setModalOpen, setModalMode, modalMode, modalMatch, setModalMatch } = useMatchModal()

    const handleAddNewMatchClick = useCallback(() => {
        setModalOpen(true)
        setModalMode(MATCH_MODAL_MODE.ADD)
    }, [setModalOpen, setModalMode])

    const handleUpdateMatchClick = useCallback((matchToUpdate: Match) => {
        setModalMode(MATCH_MODAL_MODE.EDIT)
        setModalMatch(matchToUpdate)
        setModalOpen(true)
    }, [setModalMatch, setModalMode, setModalOpen])

    const handleAddNewMatch = useCallback((newMatch: Match) => {
        onAddNewMatch(newMatch);
        setModalOpen(false)
    }, [onAddNewMatch, setModalOpen])
    
    const handleUpdateMatch = useCallback((updatedMatch: Match) => {
        onUpdateMatch(updatedMatch);
        setModalOpen(false)
    }, [onUpdateMatch, setModalOpen])
    
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