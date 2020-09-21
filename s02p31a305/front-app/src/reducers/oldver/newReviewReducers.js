import { SET_HOS_INFO } from './../actions/types'

const initializer = {
    hosInfo: {
        id: null,
        name: null,
        address: null
    }
}

const newReview = (state = initializer, action) => {
    switch (action.type) {
        case SET_HOS_INFO:
            return {
                ...state,
                hosInfo: {
                    id: action.id,
                    name: action.name,
                    address: action.address
                }
            }
        default:
            return state
    }
}

export default newReview
