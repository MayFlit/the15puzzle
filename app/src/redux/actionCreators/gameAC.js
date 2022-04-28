import { INIT_GAME, CHOISE_GAME, MOVE_GAME } from "../actionTypes/gameAT";

export const initGameAC = (payload) => {
    return {
        type: INIT_GAME,
        payload
    }
}

export const choiseGameAC = (payload) => {
    return {
        type: CHOISE_GAME,
        payload
    }
}

export const moveGameAC = (payload) => {
    return {
        type: MOVE_GAME,
        payload
    }
}