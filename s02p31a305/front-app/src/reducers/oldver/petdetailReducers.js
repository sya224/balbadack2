import { GET_PET_DETAIL } from '../../actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case GET_PET_DETAIL:
            return{...state, pet_info : action.payload}
        default:
            return state; 
    }
}