import { 
    GET_HOS_DATA,
    GET_HOS_SEARCH_LIST,
    GET_NEAR_HOS_LIST,
    GET_NEAR_HOS_BY_STAR
 } from '../actions/types'

const initializer = {
    info: {},
    searchList: [],
    nearHosList: [],
    nearHosByStar: []
}

export default (state = initializer, action) => {
    switch(action.type){
        case GET_HOS_DATA:
            return {...state, info : action.payload}
        case GET_HOS_SEARCH_LIST:
            return {...state, searchList: action.res}
        case GET_NEAR_HOS_LIST:
            return {...state, nearHosList: state.nearHosList.concat(...action.list)}
        case GET_NEAR_HOS_BY_STAR:
            return {...state, nearHosByStar: state.nearHosByStar.concat(...action.list)}
        default:
            return state; 
    }
}