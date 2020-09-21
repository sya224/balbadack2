import {
  MAIN_SEARCH,
  GET_HOS_BY_LOC,
  GET_HOS_BY_WORD,
  GET_HOS_BY_CODE,
  NAME_LIST
} from '../actions/types'

const initializer = {
  mainSearch: JSON.parse(window.localStorage.getItem('mainSearch')) || {
    searchWord: '',
    lat: 37.504909,
    long: 127.048463,
    category: 'hos',
    filter: 'nearHos',
  },
  nearHos: [],
  nearHosByStar: [],
  nearHosByReview: [],
  hosByWord: [],
  hosByReview: [],
  hosByStar: [],
  oneHosDetail: [],
  hosSearchList: null
}


export default (state = initializer, action) => {
  switch (action.type) {
    case NAME_LIST:
      if (state.hosSearchList === null) {
        return {
          ...state,
          hosSearchList: [{
            searchWord: action.searchWord,
            list: action.list
          }]
        }
      } else if (state.hosSearchList.some(s => (s.searchWord === action.searchWord))) {
        return state
      } else {
        return {
          ...state,
          hosSearchList: state.hosSearchList.concat({
            searchWord: action.searchWord,
            list: action.list
          })
        }
      }
    case MAIN_SEARCH:
      return {
        ...state,
        mainSearch: {
          searchWord: action.searchWord,
          lat: action.lat === null ? state.mainSearch.lat : action.lat,
          long: action.long === null ? state.mainSearch.long : action.long,
          category: action.category,
          filter: action.filter
        }
      }
    case GET_HOS_BY_LOC:
      if (state[action.filter].some(s => (s.lat === action.lat) && (s.long === action.long))) {
        if (state[action.filter].some(s => (s.page === action.page))) { return state }
        else {
          return {
            ...state,
            [action.filter]: state[action.filter].map(p => {
              if ((p.lat === action.lat) & (p.long === action.long)) {
                return { ...p, page: action.page, next: action.next, list: p.list.concat(...action.list) }
              } else { return p }
            })
          }
        }
      } else {
        return {
          ...state,
          [action.filter]: state[action.filter].concat({
            lat: action.lat, long: action.long, page: action.page, next: action.next, list: action.list
          })
        }
      }

    case GET_HOS_BY_WORD:
      if (state.hosByWord.some(s => (s.keyword === action.keyword))) {
        if (state[action.filter].some(s => (s.page === action.page))) { return state }
        else {
          return {
            ...state,
            hosByWord: state.hosByWord.map(p => {
              if (p.keyword === action.keyword) {
                return { ...p, page: action.page, next: p.next, list: action.list }
              } else { return p }
            })
          }
        }
      } else {
        return {
          ...state,
          hosByWord: state.hosByWord.concat({
            keyword: action.keyword, page: action.page, next: action.page, list: action.list
          })
        }
      }
    case GET_HOS_BY_CODE:
      return { ...state, oneHosDetail: action.hcode }
    default:
      return state;
  }
}