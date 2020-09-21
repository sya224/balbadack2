import { UPLOAD_RECIEPT_INFO } from '../../actions/types'


const initializer = {
    bufferData: null,
    dateIs: null,
    hasHos: null,
    items: []
  }


const reciept = (state = initializer, action) => {
    switch (action.type) {
        case UPLOAD_RECIEPT_INFO:
            console.log('upload reciept')
            return {
                ...state,
                bufferData: action.bff,
                dateIs: action.dateIs,
                hasHos: action.hasHos,
                items: action.items
            }
        default:
            return state
    }
}

export default reciept

