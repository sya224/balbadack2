import { 
    TOGGLE_SEARCH_MODAL, 
    SELECT_HOS, 
    HAS_RECIEPT, 
    COMPLETE_REVIEW,
    SET_NEAR_HOS_STATUS,
    SET_NEAR_HOS_BY_STAR_STATUS,
    SET_SEARCH_KEYWORD
} from '../../actions/types'

const initializer = {
    isAuthorized: false,
    isSearching: false,
    hosSelected: false,
    hosName: '',
    hasReciept: false,
    reviewFromMain: true,
    completeReview: false,
    searchKeyword: '',
    nearHos: {
        latitude: 37.504909, 
        longitude: 127.048463, 
        page: 0, 
        next: false
    },
    nearHosByStar: {
        latitude:37.504909,
        longitude:127.048463,
        page: 0,
        next: false
    }
}

export default (state = initializer, action) => {
    switch(action.type){
        case TOGGLE_SEARCH_MODAL:
            return{...state, isSearching : !state.isSearching}
        case SELECT_HOS:
            return{...state, hosSelected : action.hosSelected, hosName : action.hosName}
        case HAS_RECIEPT:
            return{...state, hasReciept : state.hasReciept}
        case COMPLETE_REVIEW:
            return{...state, completeReview: action.res}
        case SET_NEAR_HOS_STATUS:
            return Object.assign({}, state,{
                ...state,
                nearHos: {
                    latitude: action.lat,
                    longitude: action.long,
                    page: action.page ++,
                    next: action.next
                }
            })
        case SET_NEAR_HOS_BY_STAR_STATUS:
            return Object.assign({}, state, {
                ...state,
                nearHosByStar: {
                    latitude: action.lat,
                    longitude: action.long,
                    page: action.page ++,
                    next: action.next
                }
            })
        case SET_SEARCH_KEYWORD:
            return { ...state, searchKeyword: action.keyword }
        default:
            return state;
    }
}