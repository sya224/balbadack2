import { 
  GET_TOTAL_GRADE,
  SET_HOS_SCORE,
  DO_DOJANG
} from './../actions/types'

const scorelist = [0, 0, 0, 0, 0]
const scorelabel = ['청결', '친절함', '치료결과', '전문성', '적정한 치료']
const grade = scorelist.map((g, i) => ({ name: scorelabel[i], score: g }))

const initializer = {
  scorelist : scorelist,
  scorelabel: scorelabel,
  grade: grade,
  totalgrade: [{ name: '평균평점', score: 0 }],
  editable: false,
  dojang: false,
}

const hosGrade = (state = initializer, action) => {
  switch (action.type) {
    case GET_TOTAL_GRADE:
      const totalscore = Math.round(((state.scorelist.reduce((a, b) => a + b, 0) / state.scorelist.length) + Number.EPSILON) * 100) / 100
      return {
        ...state,
        totalgrade: [{ name:state.totalgrade[0].name, score: totalscore}]
      }
    case SET_HOS_SCORE:
      return {
        ...state,
        scorelist: state.scorelist.map((s, i) => (
          i === action.i ? action.score: s
        )),
        grade: state.grade.map(g => (
          g.name === action.name ? {name: g.name, score: action.score} : g
        ))
      }
    case DO_DOJANG:
      return { ...state, dojang: action.dojang }
    default:
      return state
  }
}

export default hosGrade
