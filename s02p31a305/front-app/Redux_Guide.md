# Balbadack Redux

## store

```json
store: {
    users: {},
    hos_info: {
        info: {},
        searchList: [],
        nearHosList: [],
        nearHosByStar: []
    },
    review_info: {
        info: {},
        list: [],
        mylist:[]
    },
    reciept_info: {
        bufferData: null,
        dateIs: null,
        hasHos: null,
        items: []
    },
    new_Review : {
        hosInfo: {
            id: null,
            name: null,
            address: null
        }
    },
    status: {
        isAuthorized: true,
        isSearching: false,
        hosSelected: false,
        hosName: '',
        hasReciept: false,
        reviewFromMain: true,
        completeReview: false,
        searchKeyword: '',
        nearHos: {
            latitude: 37.504909, 
            longitude: 127.048463, 
            page: 0, 
            next: false
        },
        nearHosByStar: {
            latitude:37.504909,
            longitude:127.048463,
            page: 0,
            next: false
        }
    },
    hosGrade: {
        scorelist : [0, 0, 0, 0, 0],
        scorelabel: ['청결', '친절함', '치료결과', '전문성', '적정한 치료'],
        grade: grade,
        totalgrade: [{ name: '평균평점', score: 0 }],
        editable: false,
        dojang: false,
    }
}
```





## actions

| action                 | parameter                  | restAPI                         | return                                                       |                                                              |
| ---------------------- | -------------------------- | ------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| getReviewList          | hcode                      | post:review/findByHospital      | dispatch(recieveReviewList(res.data))                        | 병원의 모든 리뷰 가져오기                                    |
| recieveReviewList      | list                       |                                 | GET_REVIEW_LIST, list                                        | getReviewList로 받은 리뷰를 review_info에 저장하기           |
| getMyReviewList        | uid                        | post:review/findByUser          | dispatch(recieveMyReviewList(res.data))                      | 유저의 모든 리뷰 가져오기                                    |
| recieveMyReviewList    | list                       |                                 | GET_MY_REVIEW_LIST, list                                     | getMyReviewList로 받은 리뷰를 review_info에 저장하기         |
| uploadReciept          | bff, dateIs, hasHos, items |                                 | UPLOAD_RECIEPT_INFO, bff, dateIs, hasHos, items              |                                                              |
| toggleSearchModal      |                            |                                 | TOGGLE_SEARCH_MODAL                                          | 병원 검색 모달 열기/닫기 상태 status에 저장                  |
| setHosInfo             | id, name, address          |                                 | SET_HOS_INFO, id, name, address                              | 병원 검색 리스트에서 유저가 선택한 병원 정보를 newReview.hosInfo에 저장하기 |
| selectHos              | hosSelected, hosName       |                                 | SELECT_HOS, hosSelected, hosName                             | 유저가 병원 정보를 선택한 상태임을 status에 저장             |
| hasReciept             | hasReciept                 |                                 | HAS_RECIEPT,hasReciept                                       | 유저가 영수증 인증을 한 상태임을 status에 저장               |
| setHosScore            | name, score, i             |                                 | SET_HOS_SCORE,name, score, i                                 | 병원 상세 항목 평가 갱신                                     |
| doDojang               | dojang                     |                                 | DO_DOJANG, dojang                                            | 재방문의사 hosGrade에 저장                                   |
| postReview             | body                       | post:review/insert              | dispatch(completeReview(res))                                | 작성한 리뷰 제출하기                                         |
| completeReview         | res                        |                                 | COMPLETE_REVIEW, res                                         | 작성한 리뷰 제출이 성공했는지 status에 저장하기              |
| setSearchKeyword       | keyword                    |                                 | SET_SEARCH_KEYWORD, keyword                                  | search keyword를 status에 저장                               |
| getNearHospitals       | lat, long, page            | post:hospital/location/{page}   | dispatch(recieveNearHospitals(res.data.hospital)),  dispatch(setNearHosStatus(lat, long, page, res.data.next)) | 현재 내 위치에서 3km 이내의 병원 조회                        |
| setNearHosStatus       | lat, long, page, next      |                                 | SET_NEAR_HOS_STATUS, lat, long, page, next                   | 현재 검색 중인 위치와 받았던 페이지와 next여부 status에 저장하기 |
| recieveNearHospitals   | list                       |                                 | GET_NEAR_HOS_LIST, list                                      | getNearHospitals로 받은 병원 리스트를 hos_info에 저장하기    |
| getNearHosByStar       | lat, long, page            | post:hospital/starrating/{page} | dispatch(recieveNearHosByStar(res.data.hospital)), dispatch(setNearHosByStarStatus(lat, long, page, res.data.next)) | 병원 거리검색 - 평점순 필터                                  |
| recieveNearHosByStar   | list                       |                                 | GET_NEAR_HOS_BY_STAR, list                                   | 병원 거리검색 - 평점순필터 hos_info에 저장                   |
| setNearHosByStarStatus | lat, long, page, next      |                                 | SET_NEAR_HOS_BY_STAR_STATUS, lat, long, page, next           | 병원 거리검색 상태 status에 저장                             |
| getHosSearchList       | keyword, page              | post:hospital/name/{page}       | dispatch(recieveHosSearchList(res.data))                     | 병원 키워드로 검색하기                                       |
| recieveHosSearchList   | list                       |                                 | GET_HOS_SEARCH_LIST, list                                    | 병원 검색 결과 hos_info에 저장하기                           |
|                        |                            |                                 |                                                              |                                                              |



## Reducers

### User

### statusReducers (state.status)

| case                        | return                                                       | detail |
| --------------------------- | ------------------------------------------------------------ | ------ |
| TOGGLE_SEARCH_MODAL         | isSearching : !state.isSearching                             |        |
| SELECT_HOS                  | hosSelected : action.hosSelected, hosName : action.hosName   |        |
| HAS_RECIEPT                 | hasReciept : state.hasReciept                                |        |
| COMPLETE_REVIEW             | completeReview: action.res                                   |        |
| SET_NEAR_HOS_STATUS         | nearHos: {latitude: action.lat,longitude: action.long,page: action.page ++,next: action.next}} |        |
| SET_NEAR_HOS_BY_STAR_STATUS | nearHosByStar: {latitude: action.lat,longitude: action.long,page: action.page ++,next: action.next}} |        |
| SET_SEARCH_KEYWORD          | searchKeyword: action.keyword                                |        |



### reviewReducers (state.review_info)

| case               | return                | detail |
| ------------------ | --------------------- | ------ |
| GET_REVIEW_DATA    | info : action.payload |        |
| GET_REVIEW_LIST    | list:action.list      |        |
| GET_MY_REVIEW_LIST | mylist:action.list    |        |



### hospitalReducers (state.hos_info)

| case                 | return                                                    | detail |
| -------------------- | --------------------------------------------------------- | ------ |
| GET_HOS_DATA         | info : action.payload                                     |        |
| GET_HOS_SEARCH_LIST  | searchList: action.res                                    |        |
| GET_NEAR_HOS_LIST    | nearHosList: state.nearHosList.concat(...action.list)     |        |
| GET_NEAR_HOS_BY_STAR | nearHosByStar: state.nearHosByStar.concat(...action.list) |        |



### hosGradeReducers (state.hosGrade)

| case            | return                                                       | detail |
| --------------- | ------------------------------------------------------------ | ------ |
| GET_TOTAL_GRADE | totalgrade: [{ name:state.totalgrade[0].name, score: totalscore}] |        |
| SET_HOS_SCORE   | scorelist: ..., grade: ...                                   |        |
| case DO_DOJANG: | dojang: action.dojang                                        |        |



### recieptReducers (state.reciept_info)

| case                | return                                                       | detail |
| ------------------- | ------------------------------------------------------------ | ------ |
| UPLOAD_RECIEPT_INFO | bufferData: action.bff, dateIs: action.dateIs,hasHos: action.hasHos,items: action.items |        |



### newReviewReducers (state.new_review)

| case         | return                                                       | detail |
| ------------ | ------------------------------------------------------------ | ------ |
| SET_HOS_INFO | hosInfo: {id: action.id, name: action.name, address: action.address} |        |

