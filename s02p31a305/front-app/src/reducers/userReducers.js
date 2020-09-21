import {
    SIGNIN,
    LOGOUT,
    SIGNOUT,
    GET_MY_PAGE,
    GET_MY_PETS,
    GET_PET_DETAIL,
    GET_MY_LIKE_HOS
} from '../actions/types'
// import { combineReducers } from "redux";

const initializer = {
    user: JSON.parse(sessionStorage.getItem('user')) || {},
    myPage: JSON.parse(sessionStorage.getItem('myPage')) || null,
    myPets: [],
    myPetDetails: [],
    likedHos: [],
}

export default (state = initializer, action) => {
    switch (action.type) {
        case SIGNIN:
            return { ...state, user: action.userInfo};
        case SIGNOUT || LOGOUT:
            return {...state, user: {}}
        case GET_MY_PAGE:
            return { ...state, myPage: action.result }
        case GET_MY_PETS:
            return { ...state, myPets: action.list }
        case GET_PET_DETAIL:
            // 디테일 어레이에 없는 정보를 새로 받아왔다는 가정하에 추가 (concat)
            return {...state, myPetDetails: state.myPetDetails.concat(action.animal)}
        case GET_MY_LIKE_HOS:
            return {...state, likedHos: action.data}
        default:
            return state;
    }
}


// case SINGOUT:
    // state = {};
    // return combineReducers({ state: (state = {}) => state });