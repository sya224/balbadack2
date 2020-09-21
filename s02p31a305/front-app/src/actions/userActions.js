import {
  REVIEW_ACTION,
  SIGNIN, // 유저 
  GET_MY_PAGE,
  USER_UPDATED,
  LOGOUT,
  SIGNOUT,
  GET_MY_PETS, // 펫
  GET_PET_DETAIL,
  PET_REGISTERED,
  PET_UPDATED,
  PET_DELETED,
  GET_MY_LIKE_HOS,
} from './types'
import apis from '../apis/apis';



// ------------- user 관련 action --------------

let config = sessionStorage.getItem('user') ? {
  headers: {
    Authorization: JSON.parse(sessionStorage.getItem('user')).accessToken,
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'
  }
} : null

export const reviewIng = ( now, code) => {
  console.log('reviewIng')
  return {
    type: REVIEW_ACTION,
    now, code
  }
}



// 1. 로그인 요청하기
export const signIn = (user_id, user_pw) => {
  console.log("signin")
  console.log(user_id, user_pw)
  return dispatch => {
    return apis.post('/user/login?uId=' + user_id + '&uPw=' + user_pw)
      .then(res => {
        dispatch(signedIn(res.data))
        dispatch(getMyPage())
      })
  }
};

// 1.1. 유저 정보를 user 에 저장하기
export const signedIn = (userInfo) => {
  console.log('signedIn')
  window.sessionStorage.setItem('user', JSON.stringify(userInfo))
  return {
    type: SIGNIN,
    userInfo
  }
}

// 2. 회원가입 요청하기
export const register = (user_id, user_pw) => {
  console.log('register')
  const body = { uid: user_id, upw: user_pw }
  return dispatch => {
    return apis.post('user/signup', body, config)
      .then(() => dispatch(signIn(user_id, user_pw)))
  }
}

// 3. 마이페이지 조회 요청하기
export const getMyPage = () => {
  console.log('getMyPage')
  config = sessionStorage.getItem('user') ? {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem('user')).accessToken,
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  } : null
  return dispatch => {
    return apis.post('user/mypage', null, config)
      .then((res) => dispatch(recieveMyPage(res.data)))
  }
}

// 3.1. 마이페이지 user 에 저장하기
export const recieveMyPage = (mypage) => {
  console.log('recieveMyPage')
  console.log(mypage)
  console.log(mypage.message)
  const result = mypage.message
  window.sessionStorage.removeItem('myPage')
  window.sessionStorage.setItem('myPage', JSON.stringify(result))
  return {
    type: GET_MY_PAGE,
    result
  }
}

// 4. 회원정보 수정 요청하기
export const updateUser = (sms) => {
  console.log('updateUser')
  return dispatch => {
    dispatch(userUpdated(false))
    return apis.post('user/sms?sms='+sms, null, config)
      .then(() => {
        dispatch(userUpdated(true))
        dispatch(getMyPage())
      })
  }
}

// 4.1. 회원정보 수정 요청 결과 status 에 저장하기
export const userUpdated = (code) => {
  console.log('userUpdated')
  return {
    type: USER_UPDATED,
    code
  }
}

// 5. 로그아웃결과 user에 저장하기
export const logOut = () => {
  console.log('logOut')
  window.sessionStorage.removeItem('user')
  window.sessionStorage.removeItem('myPage')
  apis.defaults.headers.common['Authorization'] = null
  return {
    type: LOGOUT
  }
}

// 6. 회원 탈퇴 요청하기
export const signOut = (uid) => {
  console.log('signOut')
  const body = { uId: uid }
  return dispatch => {
    dispatch(signedOut(false))
    return apis.post('user/signout', body, config)
      .then(() => {
        dispatch(signedOut(true))
        dispatch(logOut())
      })
  }
}

// 7. 탈퇴 결과 user에 저장하기
export const signedOut = (code) => {
  console.log('signedOut')
  apis.defaults.headers.common['Authorization'] = null
  return {
    type: SIGNOUT
    ,code
  }
}

// ------------- pet 관련 action --------------

// 1. 유저의 모든 펫 정보 요청하기
export const getMyPets = (u_id) => {
  console.log('getMyPets')

  return dispatch => {
    return apis.post('animal/mycompanion/all?u_id=' + u_id, null, config)
      .then(res => dispatch(recieveMyPets(res.data)))
  }
}

// 1.1. 유저의 모든 펫 정보 user_info 에 저장하기
export const recieveMyPets = (list) => {
  console.log(list)
  console.log('recieveMyPets')
  return {
    type: GET_MY_PETS,
    list
  }
}

// 2.1. 유저의 펫 상세 정보 요청하기
export const getPetDetail = (a_code, u_id) => {
  console.log('getPetDetail')
  return dispatch => {
    return apis.post('animal/one?a_code=' + a_code + '&u_id=' + u_id, null, config)
      .then(res => dispatch(recievePetDetail(res.data)))
  }
}

// 2.2. 유저의 펫 상세 정보 저장하기
export const recievePetDetail = (animal) => {
  console.log('recievePetDetail')
  return {
    type: GET_PET_DETAIL,
    animal
  }
}

// 3.1. 펫 정보 등록하기
export const registerPet = (body) => {
  console.log('registerPet')
  return dispatch => {
    dispatch(petRegistered(false))
    return apis.post('animal/insert', body, config)
      .then(() => dispatch(petRegistered(true)))
  }
}

// 3.2. 등록한 결과 status에 저장하기
export const petRegistered = (code) => {
  console.log(petRegistered)
  return {
    type: PET_REGISTERED,
    code
  }
}

// 4. 펫 정보 수정하기
export const updatePet = (body) => {
  console.log('updatePet')
  return dispatch => {
    dispatch(petUpdated(false))
    return apis.post('animal/update', body, config)
      .then(() => dispatch(petUpdated(true)))
  }
}

// 4.1. 수정한 결과 status에 저장하기
export const petUpdated = (code) => {
  console.log('petUpdated')
  return {
    type: PET_UPDATED,
    code
  }
}

// 5. 펫 삭제하기
export const deletePet = (a_code, u_id) => {
  console.log('deletePet')
  return dispatch => {
    dispatch(petDeleted(false))
    return apis.post('animal/delete?a_code=' + a_code + '&u_id=' + u_id, null, config)
      .then(() => dispatch(petDeleted(true)))
  }
}

// 5.1. 삭제된 결과 status에 저장하기
export const petDeleted = (code) => {
  console.log('petDeleted')
  return {
    type: PET_DELETED,
    code
  }
}




// 6. 유저의 병원 즐겨찾기 조회 요청
export const getMyLikeHos = (u_id) => {
  console.log('getMyLikeHos', u_id)
  console.log(config)
  const body = {
    u_id: u_id
  }
  return dispatch => {
    return apis.post('favoriteHospital/findById?uId=' + u_id, null, config)
      .then(res => dispatch(recieveMyLikeHos(res.data)))
  }
}

// 6.1. 즐겨찾기 결과 user에 저장
export const recieveMyLikeHos = (data) => {
  console.log('recieveMyLikeHos', data)
  return {
    type: GET_MY_LIKE_HOS,
    data
  }
}