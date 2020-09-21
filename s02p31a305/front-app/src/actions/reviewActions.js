import {
  GET_HOS_REVIEW,
  GET_MY_REVIEW,
  REVIEW_MAIN_SEARCH,
  REVIEW_SEARCH_STATUS,
  SEARCH_FLAG,
  GET_REVIEW,
  REVIEW_POSTED,
  REVIEW_UPDATED,
  REVIEW_DELETED,
  SET_SEARCH_KEYWORD, // selectOption 관련
  TOGGLE_SEARCH_MODAL,
  SET_HOS_INFO,
  SET_HOS_SCORE, // reviewForm 관련
  GET_TOTAL_GRADE,
  DO_DOJANG,
  UPLOAD_RECIEPT,
  REVIEW_REPORTED, // report 관련
  REPORT_CANCELED,
  GET_MY_REPORT,
  GET_REVIEW_REPORT,
  REVIEW_GOOD,
  REVIEW_BAD
} from './types'
import apis from '../apis/apis';

let config = sessionStorage.getItem('user') ? {
  headers: {
    Authorization: JSON.parse(sessionStorage.getItem('user')).accessToken,
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'
  }
} : null

// ---------- main.js ---------------------
export const mainSearch = (searchWord, lat, long, distance, filter) => {
  console.log('rmainSearch')
  return dispatch => {
    dispatch(setSearchStatus(false))
    dispatch(setMainSearch(searchWord, lat, long, distance, filter))
    return dispatch(getReview(searchWord, lat, long, distance, filter))
  }
}

export const setMainSearch = (searchWord, lat, long, distance, filter) => {
  console.log('rsetMainSearch')
  const item = {searchWord: searchWord,lat: lat,long: long,distance: distance,filter: filter}
  window.localStorage.setItem('rmainSearch', JSON.stringify(item))
  return {
    type: REVIEW_MAIN_SEARCH,
    searchWord, lat, long, distance, filter
  }
}

export const setSearchStatus = (code) => {
  console.log('rsetSearchStatus')
  return {
    type: REVIEW_SEARCH_STATUS,
    code
  }
}

export const SearchFlag = (flag) => {
  console.log('SearchFlag', flag)
  return {
    type: SEARCH_FLAG,
    flag
  }
}

// ------------- review 관련 action --------
// 1. 현재 내 위치에서 3km 이내의 리뷰 조회 with 필터
export const getReview = (searchWord, lat, long, distance, filter) => {
  console.log('getReview')
  console.log('reviewActions config', config)
  return dispatch => {
    return apis.post(`/review/findByKeyword/${distance}/${filter}/${searchWord}?latitude=${lat}&longtitude=${long}`, null, config)
      .then(res => {
        dispatch(recieveReview(searchWord, lat, long, res.data, distance, filter))
        dispatch(setSearchStatus(true))
      })
  }
}

// 1.2 getNearHospitals로 받은 병원 리스트를 hos_info 에 저장하기
export const recieveReview = (searchWord, lat, long, list, distance, filter) => {
  console.log('recieveReview')
  console.log(list)
  return {
    type: GET_REVIEW,
    searchWord, lat, long, list, distance, filter
  }
}




// ------------- review 관련 action --------
// 1. 리뷰 병원별로 요청하기
export const getHosReview = (hcode, atoken) => {
  console.log('getHosReview')
  console.log(config)
  return dispatch => {
    return apis.post('review/findByHospital?h_code=' + hcode, null, config)
      .then(res => dispatch(recieveHosReview(res.data)))
  }
}

// 1.1. 병원별 리뷰 review_info에 저장하기
export const recieveHosReview = (list) => {
  console.log('recieveHosReview', list)
  return {
    type: GET_HOS_REVIEW,
    list
  }
}

// 2. 리뷰 유저별로 요청하기
export const getMyReview = (uid) => {
  console.log('getMyReview')
  return dispatch => {
    return apis.post('review/findByUser?u_id=' + uid, null, config)
      .then(res => dispatch(recieveMyReview(res.data)))
  }
}

// 2.1. getMyReviewList로 받은 리뷰를 review_info에 저장하기
export const recieveMyReview = (list) => {
  return {
    type: GET_MY_REVIEW,
    list
  }
}

// 3. 리뷰 등록 요청하기
export const postReview = (body) => {
  console.log('postReview')
  return dispatch => {
    dispatch(reviewPosted(false))
    return apis.post('review/insert', body, config)
      .then(() => dispatch(reviewPosted(true)))
  }
}

// 3.1. 작성한 리뷰 제출 결과 status에 저장하기
export const reviewPosted = (code) => {
  console.log('reviewPosted')
  return {
    type: REVIEW_POSTED,
    code
  }
}

// 4. 리뷰 수정 요청하기
export const updateReview = (body) => {
  console.log('updateReview')
  return dispatch => {
    dispatch(reviewUpdated(false))
    return apis.put('review/update', body, config)
      .then(() => dispatch(reviewUpdated(true)))
  }
}

// 4.1. 리뷰 수정 결과 status 에 등록
export const reviewUpdated = (code) => {
  console.log('reviewUpdated')
  return {
    type: REVIEW_UPDATED,
    code
  }
}

// 5. 리뷰 삭제하기
export const deleteReview = (r_code) => {
  console.log('deleteReview')
  return dispatch => {
    dispatch(reviewDeleted(false))
    return apis.post('review/update?r_code='+r_code, null, config)
      .then(() => dispatch(reviewDeleted(true)))
  }
}

// 5.1. 리뷰 삭제결과 status에 저장
export const reviewDeleted = (code) => {
  console.log('reviewDeleted')
  return {
    type: REVIEW_DELETED,
    code
  }
}

// ------------screens/selectOptions.js------------
// 0. search keyword를 review에 저장
export const setSearchKeyword = (keyword) => {
  console.log('setSearchKeyword')
  return {
    type: SET_SEARCH_KEYWORD,
    keyword
  }
}

// 1. 병원 선택하기
// 병원 검색 모달 열기/닫기
export const toggleSearchModal = () => {
  return {
    type: TOGGLE_SEARCH_MODAL
  }
}


// 병원 검색 리스트에서 유저가 선택한 병원 정보 저장하기
export const setHosInfo = (id, name, address) => {
  console.log('set hos info')
  return {
    type: SET_HOS_INFO,
    id, name, address
  }
}

// --------- screens/ReviewForm.js ------------
// 1. 병원상세평가
// 상세 항목 평가 갱신
export const setHosScore = (name, score, i) => {
  return {
    type: SET_HOS_SCORE,
    name, score, i
  }
}

// 상세 항목 평가를 갱신하고 난 이후에 평균 평점을 다시 가져오기
export const getTotalGrade = () => {
  return {
    type: GET_TOTAL_GRADE
  }
}


// 2. 재방문의사 저장
export const doDojang = (dojang) => {
  return {
    type: DO_DOJANG,
    dojang
  }
}

// 3. 영수증 정보 store에 저장
export const uploadReciept = (bff, dateIs, hasHos, items) => {
  console.log(bff, dateIs, hasHos, items)
  console.log("upload reciept")
  return {
    type: UPLOAD_RECIEPT,
    bff, dateIs, hasHos, items
  }
}

// -------- 리뷰 신고 관련 actions ---------------

// 1. 리뷰 신고요청
export const reportReview = (reCode) => {
  console.log('reportReview')
  const report = {
    reCode : reCode
  }
  return dispatch => {
    dispatch(reviewReported(false))
    return apis.post('report/insert', report, config)
      .then(() => dispatch(reviewReported(true)))
  }
}

// 1.1. 리뷰 신고결과 status에 저장
export const reviewReported = (code) => {
  console.log('reviewReported')
  return {
    type: REVIEW_REPORTED,
    code
  }
}

// 2. 리뷰 신고 취소 요청
export const reportCancel = (reCode) => {
  console.log('reportCancel')
  return dispatch => {
    dispatch(reportCanceled(false))
    return apis.post('report/delete', reCode, config)
      .then(() => dispatch(reportCanceled(true)))
  }
}

// 2.1. 리뷰 신고취소결과 status에 저장
export const reportCanceled = (code) => {
  console.log('reportCanceled')
  return {
    type: REPORT_CANCELED,
    code
  }
}

// 3. 신고 회원별 조회요청
export const getMyReport = (u_id) => {
  console.log('getMyReport')
  const body = {
    u_id: u_id
  }
  return dispatch => {
    return apis.post('report/findById', body, config)
      .then(res => dispatch(recieveMyReport(res.data)))
  }
}


// 3.1. 신고 회원별 조회 user에 저장
export const recieveMyReport = (reports) => {
  console.log('recieveMyReport')
  return {
    type: GET_MY_REPORT,
    reports
  }
}

// 4. 신고 리뷰별 조회요청
export const getReviewReport = (r_code) => {
  console.log('getMyReport')
  const body = {
    r_code: r_code
  }
  return dispatch => {
    return apis.post('report/findByReview', body, config)
      .then(res => dispatch(recieveReviewReport(res.data)))
  }
}


// 4.1. 신고 리뷰별 조회 review에 저장
export const recieveReviewReport = (reports) => {
  console.log('recieveReviewReport')
  return {
    type: GET_REVIEW_REPORT,
    reports
  }
}


// ------------- 리뷰 도움이 되었어요 기능 관련 action --------
// 1. 좋아요 등록 요청
export const goodReview = (hcode, rcode, ucode) => {
  console.log('goodReview')
  const good = {
    review: {
      hospital:{hcode: hcode},
      rcode: rcode,
      user: {ucode: ucode}
    }
  }
  return dispatch => {
    dispatch(reviewGood(false))
    return apis.post('good/insert', good, config)
    .then(() => dispatch(reviewGood(true)))
  }
}

// 1.1. 좋아요 등록 결과 status에 저장
export const reviewGood = (code) => {
  console.log('reviewGood')
  return {
    type: REVIEW_GOOD,
    code
  }
}

// 2. 좋아요 등록 취소
export const badReview = (hcode, rcode, ucode) => {
  console.log('badReview')
  const good = {
    review: {
      hospital: {hcode: hcode},
      rcode: rcode,
      user: {ucode: ucode}
    }
  }
  return dispatch => {
    dispatch(reviewBad(false))
    return apis.delete('good/delete', good, config)
    .then(res => dispatch(reviewBad(true)))
  }
}

// 2.1. 싫어요 등록 결과 status에 저장
export const reviewBad = (code) => {
  console.log('reviewBad')
  return {
    type: REVIEW_BAD,
    code
  }
}



// 3. 리뷰 좋아요 회원별 조회
// 3.1. 리뷰 좋아요 user에 저장
// 4. 리뷰 좋아요 리뷰별 조회
// 4.1. 리뷰 좋아요 


