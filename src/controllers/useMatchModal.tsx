import React, { useState } from 'react'
import { Match } from '../types/Match'
import { MATCH_MODAL_MODE } from '../constants/matchModalModes'

const useMatchModal = () => {
    const [modalMode, setModalMode] = useState(MATCH_MODAL_MODE.ADD)
    const [isModalOpened, setModalOpen] = useState(false)
    const [modalMatch, setModalMatch] = useState<Match>()

    return {
        isModalOpened,
        setModalOpen,
        modalMode,
        setModalMode,
        modalMatch,
        setModalMatch
    }
}

export default useMatchModal