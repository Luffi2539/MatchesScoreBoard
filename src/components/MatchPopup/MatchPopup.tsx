import { FormEvent, FunctionComponent, useEffect, useState } from "react"
import { MATCH_MODAL_MODE } from '../../constants/matchModalModes'
import './MatchPopup.css'
import { Match, MatchWithoutId } from "../../types/Match";
import Button from "../Button";
import generateId from "../../utils/generateId";

interface MatchModal {
    mode: MATCH_MODAL_MODE;
    isOpened: boolean;
    match?: Match;
    onAddNewMatch: (data: Match) => void;
    onUpdateMatch: (data: Match) => void;
    closeModal: () => void;
}

const ONLY_NUMERIC_REGEX = /^\d+$/

const MatchPopup: FunctionComponent<MatchModal> = ({ mode, isOpened, match, onAddNewMatch, onUpdateMatch, closeModal }) => {
    const [homeTeamName, setHomeTeamName] = useState(match ? match.homeTeam : '')
    const [awayTeamName, setAwayTeamName] = useState(match ? match.awayTeam : '')
    const [homeTeamScore, setHomeTeamScore] = useState(match ? match.homeTeamScore : 0)
    const [awayTeamScore, setAwayTeamScore] = useState(match ? match.awayTeamScore : 0)

    const isEditMode = mode === MATCH_MODAL_MODE.EDIT

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if(isEditMode && match) {
            onUpdateMatch({
                ...match,
                homeTeam: homeTeamName,
                awayTeam: awayTeamName,
                homeTeamScore,
                awayTeamScore
            })

            return;
        }
        const newMatch: MatchWithoutId = {
            homeTeam: homeTeamName,
            awayTeam: awayTeamName,
            homeTeamScore,
            awayTeamScore,
            startTime: new Date()
        }
        onAddNewMatch({
            ...newMatch,
            id: generateId(newMatch)
        })
    }

    useEffect(() => {
        if(match) {
            setHomeTeamName(match.homeTeam)
            setAwayTeamName(match.awayTeam)
            setHomeTeamScore(match.homeTeamScore)
            setAwayTeamScore(match.awayTeamScore)
        }
    }, [match])
    
    if(!isOpened) {
        return null
    }

    return <div className="popup__container">
        <form className="match__form" onSubmit={handleSubmit}>
            <label>
                Home Team
                <input className="form__input" value={homeTeamName} onChange={(e) => setHomeTeamName(e.target.value)} />
            </label>
            <label>
                Away Team
                <input className="form__input" value={awayTeamName} onChange={(e) => setAwayTeamName(e.target.value)} />
            </label>
            <label>
                Home Team Score
                <input className="form__input" value={homeTeamScore} onChange={(e) => {
                    const { value } = e.target
                    if(!value) {
                        setHomeTeamScore(0)
                        return
                    }
                    if(ONLY_NUMERIC_REGEX.test(value)) {
                        setHomeTeamScore(Number(e.target.value))
                    }
                }} />
            </label>
            <label>
                Away Team Score
                <input className="form__input" value={awayTeamScore} onChange={(e) => {
                    const { value } = e.target
                    if(!value) {
                        setAwayTeamScore(0)
                        return
                    }
                    if(ONLY_NUMERIC_REGEX.test(value)) {
                        setAwayTeamScore(Number(e.target.value))
                    }
                }} />
            </label>
            <div className="controls__container">
                <Button disabled={!homeTeamName || !awayTeamName} className="submit-match-button" title={isEditMode ? 'Edit Match' : 'Add Match' } submit />
                <Button title={'Close'} onClick={closeModal}/>
            </div>
        </form>
    </div>
}

export default MatchPopup