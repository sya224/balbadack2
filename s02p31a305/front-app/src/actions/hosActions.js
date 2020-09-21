import {
  NAME_LIST,
  MAIN_SEARCH,
  SEARCH_STATUS,
  GET_HOS_BY_LOC,
  GET_HOS_BY_WORD,
  HOS_LIKED,
  HOS_DISLIKED,
  GET_HOS_BY_CODE,
  GET_HOS_PHOTO
} from './types'
import apis from '../apis/apis';

let config = sessionStorage.getItem('user') ? {
  headers: {
    Authorization: JSON.parse(sessionStorage.getItem('user')).accessToken,
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'
  }
} : null

export const getHosSearchList = (searchword) => {
  console.log('getHosSearchList')
  return dispatch =>{
    dispatch(setSearchStatus(false))
    return apis.post('hospital/name?Name='+searchword, null, config)
    .then(res => {
      dispatch(recieveHosSearchList(searchword, res.data))
      dispatch(setSearchStatus(true))
    })
  }
}

export const recieveHosSearchList = (searchWord, list) => {
  return {
    type:NAME_LIST,
    searchWord, list
  }
}


// ---------- main.js ---------------------
export const mainSearch = (searchWord, lat, long, category, filter, page=null) => {
  console.log('mainSearch')
  page = page === null ? 0 : page
  return dispatch => {
    dispatch(setSearchStatus(false))
    dispatch(setMainSearch(searchWord, lat, long, category, filter))
    if (category === 'hosByLoc') {
      if (filter === 'hosByReview') {
        return dispatch(getHosByReview(lat, long, page, null, category, filter))
      } else if (filter === 'hosByStar') {
        return dispatch(getHosByStar(lat, long, page, null, category, filter))
      } else {
        let mode
        if (filter === 'nearHosByReview') {
          mode = 'review'
        } else if (filter === 'nearHosByStar') {
          mode = 'starrating'
        } else {
          mode = null
        }
        console.log('mode----------', mode)
        return dispatch(getNearHos(lat, long, page, mode, category, filter))
      }
    } else {
      return dispatch(getHosByWord(searchWord, page, category, filter))
    }
  }
}

export const setMainSearch = (searchWord, lat, long, category, filter) => {
  console.log('setMainSearch')
  const item = {searchWord: searchWord,lat: lat,long: long,category: category,filter: filter}
  window.localStorage.setItem('mainSearch', JSON.stringify(item))
  return {
    type: MAIN_SEARCH,
    searchWord, lat, long, category, filter
  }
}

export const setSearchStatus = (code) => {
  console.log('setSearchStatus')
  return {
    type: SEARCH_STATUS,
    code
  }
}

// ------------- hospital 관련 action --------
// 1. 현재 내 위치에서 3km 이내의 병원 조회 with 필터
export const getNearHos = (lat, long, page, mode, category, filter) => {
  console.log('getNearHospitals')
  const url = 'hospital/location/'+page+ '?latitude=' + lat + '&longtitude=' + long
  const reqURL = mode === null ? url : url + '&mode=' + mode
  return dispatch => {
    return apis.post(reqURL, null, config)
      .then(res => {
        dispatch(recieveHosByLoc(lat, long, page, res.data.next, res.data.hospital, category, filter))
        dispatch(setSearchStatus(true))
      })
  }
}

// 3. 전체 지역 병원 검색 리뷰순 요청하기
export const getHosByReview = (lat, long, page, category, filter) => {
  console.log('getHosByReview')
  return dispatch => {
    return apis.post('hospital/reviewcnt/'+page+ '?latitude=' + lat + '&longtitude=' + long, null, config)
      .then(res => {
        dispatch(recieveHosByLoc(lat, long, page, res.data.next, res.data.hospital, category, filter))
        dispatch(setSearchStatus(true))
      })
  }
}

// 4. 전체 지역 병원 검색 별점순 요청하기
export const getHosByStar = (lat, long, page, category, filter) => {
  console.log('getHosByStar')
  return dispatch => {
    return apis.post('hospital/starrating/'+page+ '?latitude=' + lat + '&longtitude=' + long, null, config)
      .then(res => {
        dispatch(recieveHosByLoc(lat, long, page, res.data.next, res.data.hospital, category, filter))
        dispatch(setSearchStatus(true))
      })
  }
}

// 1.2 getNearHospitals로 받은 병원 리스트를 hos_info 에 저장하기
export const recieveHosByLoc = (lat, long, page, next, list, category, filter) => {
  console.log('recieveHos')
  return {
    type: GET_HOS_BY_LOC,
    lat, long, page, next, list, category, filter
  }
}


// 2. 병원 키워드로 검색하기
export const getHosByWord = (keyword, page, category, filter) => {
  console.log('getHosByword')
  const lat = 37.504909
  const long = 127.048463
  const req = 'hospital/keyword/'+page+'?keyword='+keyword+'&latitude='+lat+'&longtitude='+long
  return dispatch => {
    return apis.post(req, null, config)
      .then(res => {
        dispatch(recieveHosByWord(keyword, page, res.data.next, res.data.hospital, category, filter))
        dispatch(setSearchStatus(true))
      })
  }
}

// 2.1. 키워드 검색 결과 hos_info에 저장하기
export const recieveHosByWord = (keyword, page, next, list, category, filter) => {
  console.log('recieveHosByWord')
  return {
    type: GET_HOS_BY_WORD,
    keyword, page, next, list, category, filter
  }
}

// ------------- 병원 즐겨찾기 기능 관련 action --------------
// 1. 즐겨찾기 추가 요청
export const likeHos = (hcode) => {
  console.log('likeHos--------------')
  console.log(hcode)
  console.log(config)
  const favoriteHospital = {
    hcode: hcode
  }
  console.log(favoriteHospital)
  return dispatch => {
    dispatch(hosLiked(false))
    return apis.post('favoriteHospital/insert', favoriteHospital, config)
      .then((res) => dispatch(hosLiked(res.data)))
  }
}


// 2. 즐겨찾기 취소 요청
export const dislikeHos = (hcode, ucode) => {
  console.log('dislikeHos')
  const favoriteHospital = {
    hcode: hcode
  }
  return dispatch => {
    dispatch(hosDisliked(false))
    return apis.post('favoriteHospital/delete', favoriteHospital, config)
      .then(() => dispatch(hosDisliked(true)))
  }
}

// 1.1. 즐겨찾기 추가 결과 status에 저장
export const hosLiked = (code) => {
  console.log('hosLiked', code)
  return {
    type: HOS_LIKED,
    code
  }
}

// 2.1. 즐겨찾기 삭제 결과 status에 저장
export const hosDisliked = (code) => {
  console.log('hosDisliked')
  return {
    type: HOS_DISLIKED,
    code
  }
}


export const getHosByCode = (hcode) => {


    console.log('getHosByCode: ', hcode)
    console.log(config)
    let hc = [ hcode ]
    return dispatch => {
      
      return apis.post('hospital/code', hc, config)
        .then(res => dispatch(recieveOneHos(res.data)))
    }
  }
  
  export const recieveOneHos = (hcode) => {
    console.log('3333333333333333')
    console.log('recieveOneHos :  ',hcode)
    return {
      type: GET_HOS_BY_CODE,
      hcode
    }
  }


// 4. 특정 병원 사진 가져오기

// export const getHosPhoto = (photocode) => {
//   console.log('photocode')
//   console.log(photocode)
//   return dispatch => {
//     return apis.post('favoriteHospital/findById', photocode, config)
//       .then(res => dispatch(recieveMyLikeHos(res.data)))
//   }
// }

export const recievePhoto = (photocode) => {
  console.log('recievePhoto :  ',photocode)
  return {
    type: GET_HOS_PHOTO,
    photocode
  }
}