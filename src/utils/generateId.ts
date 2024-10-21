import { MatchWithoutId } from "../types/Match"

const generateId = (matchData: MatchWithoutId) => JSON.stringify(matchData)

export default generateId