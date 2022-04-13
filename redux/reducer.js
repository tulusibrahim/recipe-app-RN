export const reducerFavorite = (state = [], action) => {
    if (action.type == 'ADDFAV') {
        return [...state, action.payload]
    }
    else if (action.type == 'REMOVEFAV') {
        return state.filter(i => i !== action.payload)
    }
    return state
}

export const reducerCook = (state = [], action) => {
    if (action.type == 'ADDCOOK') {
        return [...state, action.payload]
    }
    else if (action.type == 'FINISHCOOK') {
        return state.filter(i => i !== action.payload)
    }
    return state
}

export const reducerCookSteps = (state = [], action) => {
    if (action.type == 'ADDSTEP') {
        return [...state, action.payload]
    }
    else if (action.type == 'REMOVESTEP') {
        return state.filter(i => i !== action.payload)
    }
    return state
}