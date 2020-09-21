import {
	GET_HOS_REVIEW,
	GET_MY_REVIEW,
	REVIEW_MAIN_SEARCH, // Res 관련
	GET_REVIEW,
	GET_REVIEW_REPORT,
	GET_MY_REPORT,
	SET_SEARCH_KEYWORD, // selectOption 관련
	TOGGLE_SEARCH_MODAL,
	SET_HOS_INFO,
	SET_HOS_SCORE, // reviewForm 관련
	GET_TOTAL_GRADE,
	DO_DOJANG,
	UPLOAD_RECIEPT,
} from '../actions/types'

const scorelist = [0, 0, 0, 0, 0]
const scorelabel = ['청결', '친절함', '치료결과', '전문성', '적정한 치료']
const grade = scorelist.map((g, i) => ({ name: scorelabel[i], score: g }))


const initializer = {
	mainSearch: JSON.parse(window.localStorage.getItem('rmainSearch')) || {
		searchWord: '슬개골탈구',
		lat: 37.504909,
		long: 127.048463,
		distance: 'yes',
		filter: 'a',
	},
	review: [],
	hosReview: [],
	myReview: [],
	reviewReport: [],
	userReport: [],
	hosSearchWord: null,
	toggleSearchModal: false,
	hosInfo: null,
	reciept: null,
	scorelist: scorelist,
	scorelabel: scorelabel,
	grade: grade,
	totalgrade: [{ name: '평균평점', score: 0 }],
	dojang: false,
}

console.log('reducer')

export default (state = initializer, action) => {
	switch (action.type) {
		case REVIEW_MAIN_SEARCH:
			return {
				...state,
				mainSearch: {
					searchWord: action.searchWord,
					lat: action.lat,
					long: action.long,
					distance: action.distance,
					filter: action.filter
				}
			}
		case GET_REVIEW:
			if (state.review.some(s => 
					(s.searchWord === action.searchWord) && 
					(s.distance === action.distance) && 
					(s.filter === action.filter) && 
					(s.lat === action.lat) && 
					(s.long === action.long))) {
				return { state } }
			else {
				return {
					...state,
					review : state.review.concat({ 
						searchWord:action.searchWord, 
						distance: action.distance,
						filter: action.filter,
						lat: action.lat, 
						long: action.long, 
						list: action.list})
				}
			}
		case GET_HOS_REVIEW:
			return { ...state, hosReview: [...action.list] }
		case GET_MY_REVIEW:
			return { ...state, myReview: [...action.list] }
		case GET_REVIEW_REPORT:
			return { ...state, reviewReport: action.list }
		case GET_MY_REPORT:
			return { ...state, userReport: action.list }
		case SET_SEARCH_KEYWORD:
			return { ...state, hosSearchWord: action.keyword }
		case TOGGLE_SEARCH_MODAL:
			return { ...state, toggleSearchModal: !state.toggleSearchModal }
		case SET_HOS_INFO:
			return { ...state, hosInfo: { id: action.id, name: action.name, address: action.address } }
		case GET_TOTAL_GRADE:
			const totalscore = Math.round(((state.scorelist.reduce((a, b) => a + b, 0) / state.scorelist.length) + Number.EPSILON) * 100) / 100
			return { ...state, totalgrade: [{ name: state.totalgrade[0].name, score: totalscore }] }
		case SET_HOS_SCORE:
			return {
				...state,
				scorelist: state.scorelist.map((s, i) => (
					i === action.i ? action.score : s
				)),
				grade: state.grade.map(g => (
					g.name === action.name ? { name: g.name, score: action.score } : g
				))
			}
		case DO_DOJANG:
			return { ...state, dojang: action.dojang }
		case UPLOAD_RECIEPT:
			return { ...state, reciept: { bff: action.bff, dateIs: action.dateIs, hasHos: action.hasHos, items: action.items } }
		default:
			return state;
	}
}