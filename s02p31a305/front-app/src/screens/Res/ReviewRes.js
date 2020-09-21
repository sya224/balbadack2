import React, { Component } from "react";
import { connect } from "react-redux";
import ReviewInfoCard from '../../components/ReviewInfoCard/ReviewInfoCard';
import { review } from '../../actions'
const widthLength = 100;


const reviewData = [
  {
    r_no: 0,
    u_id: 'aestas',
    r_nickname: '익명의 코끼리3',
    r_photo1: 'https://lh3.googleusercontent.com/proxy/QYikpOM5d8B4H0_YTn1sfYzEQcGYjKwUtseoQXBpXqhjh3bsn04ZdeNL533bsCyivn3OzERLxq2zBPl5l9rt_UU_B6PlMBkQHef624cQ8DI0TjJkozUb8Qyhs8kYkTGclUI-uGs83FjcgEo',
    r_photo2: 'http://www.busan.com/nas/wcms/wcms_data/photos/2020/02/12/2020021209194665170_l.jpg,https://modo-phinf.pstatic.net/20160629_37/1467141681611RHSrJ_JPEG/mosaazDVas.jpeg?type=w1100',
    r_photo3: '',
    r_content: '2010년부터 다니던 병원입니다. 고양이에게 중성화 수술은 꼭 필요한 것 같아요. 계속 힘들어해서 몇 차례 검진 받고 선생님과 상담후에 중성화 수술을 하게되었습니다. 선생님 정말 친절하시고요 여기 애견용 풀도 있는 것 같아서 상처 부위 치료되면 또 오려고요!',
    r_reciept: true,
    r_treatmentdata: '2020-05-10',
    r_date: '2020-05-10',
    tags: ['중성화수술', "고양이", "15kg", '정기적', "친절", "전용풀장", "감사"],
    r_clean: 1,
    r_kindness: 2,
    r_result: 1,
    r_professionality: 2,
    r_overtreatment: 1,
    r_report: 0,
    r_deleted: false,
    r_totalgood: 3,
    Like: [{ u_id: 1 }, { u_id: 2 }, { u_id: 3 }],
    careinfo: [
      {
        ci_no: 2,
        h_code: 1,
        ci_vet: '고양이',
        ci_price: 25000,
        CareList: {
          c_code: 3,
          c_name: '중성화수술',
          c_category: '수술'
        },
        r_no: 0
      },
      {
        ci_no: 3,
        h_code: 1,
        ci_vet: '고양이',
        ci_price: 30000,
        CareList: {
          c_code: 4,
          c_name: '붕대',
          c_category: '시술'
        },
        r_no: 0
      },
      {
        ci_no: 4,
        h_code: 1,
        ci_vet: '고양이',
        ci_price: 50000,
        CareList: {
          c_code: 2,
          c_name: '마취약',
          c_category: '주사'
        },
        r_no: 0
      }
    ],
    h_code: 1
  },
  {
    r_no: 0,
    u_id: 'aestas',
    r_nickname: '익명의 코끼리2',
    r_photo1: 'https://lh3.googleusercontent.com/proxy/QYikpOM5d8B4H0_YTn1sfYzEQcGYjKwUtseoQXBpXqhjh3bsn04ZdeNL533bsCyivn3OzERLxq2zBPl5l9rt_UU_B6PlMBkQHef624cQ8DI0TjJkozUb8Qyhs8kYkTGclUI-uGs83FjcgEo',
    r_photo2: 'http://www.busan.com/nas/wcms/wcms_data/photos/2020/02/12/2020021209194665170_l.jpg,https://modo-phinf.pstatic.net/20160629_37/1467141681611RHSrJ_JPEG/mosaazDVas.jpeg?type=w1100',
    r_photo3: '',
    r_content: '2010년부터 다니던 병원입니다. 고양이에게 중성화 수술은 꼭 필요한 것 같아요. 계속 힘들어해서 몇 차례 검진 받고 선생님과 상담후에 중성화 수술을 하게되었습니다. 선생님 정말 친절하시고요 여기 애견용 풀도 있는 것 같아서 상처 부위 치료되면 또 오려고요!',
    r_reciept: true,
    r_treatmentdata: '2020-05-10',
    r_date: '2020-05-10',
    tags: ['중성화수술', "고양이", "15kg", '정기적', "친절", "전용풀장", "감사"],
    r_clean: 4,
    r_kindness: 4,
    r_result: 4,
    r_professionality: 3,
    r_overtreatment: 1,
    r_report: 0,
    r_deleted: false,
    Like: [{ u_id: 1 }, { u_id: 2 }, { u_id: 3 }],
    careinfo: [
      {
        ci_no: 2,
        h_code: 1,
        ci_vet: '고양이',
        ci_price: 25000,
        CareList: {
          c_code: 3,
          c_name: '중성화수술',
          c_category: '수술'
        },
        r_no: 0
      },
      {
        ci_no: 3,
        h_code: 1,
        ci_vet: '고양이',
        ci_price: 30000,
        CareList: {
          c_code: 4,
          c_name: '붕대',
          c_category: '시술'
        },
        r_no: 0
      },
      {
        ci_no: 4,
        h_code: 1,
        ci_vet: '고양이',
        ci_price: 50000,
        CareList: {
          c_code: 2,
          c_name: '마취약',
          c_category: '주사'
        },
        r_no: 0
      }
    ],
    h_code: 1
  },
]

class ReviewRes extends Component {
  constructor(props) {
    super(props);
    console.log('---', props.review)
    // const { searchWord, lat, long, distance, filter } = props.review.mainSearch
    if(this.props.review.mainSearch === undefined){
      var { searchWord, lat, long, distance, filter } = this.props.review.state.mainSearch
    }
    else{ 
      var { searchWord, lat, long, distance, filter } = this.props.review.mainSearch
    }
    console.log(props.review)
    console.log(searchWord, lat, long, distance, filter, 'yeayeah')
    console.log('---------------', props.review)
    if(this.props.review.review === undefined){
      if (props.review.state.review.length !== 0) {
        if (!(props.review.state.review.find(s => 
          ((s.searchWord === searchWord) && 
          (s.distance === distance) && 
          (s.filter === filter) && 
          (s.lat === lat) && 
          (s.long === long))))) { 
            console.log('여기?')
            props.mainSearch(searchWord, lat, long, distance, filter) 
          }
      } else {
        console.log('여기??')
        props.mainSearch(searchWord, lat, long, distance, filter)
      }
    }
    else{
      if (props.review.review.length !== 0) {
        if (!(props.review.review.find(s => 
          ((s.searchWord === searchWord) && 
          (s.distance === distance) && 
          (s.filter === filter) && 
          (s.lat === lat) && 
          (s.long === long))))) { 
            console.log('여기?')
            props.mainSearch(searchWord, lat, long, distance, filter) 
          }
      } else {
        console.log('여기??')
        props.mainSearch(searchWord, lat, long, distance, filter)
      }
    }

  }

  render() {
    let resInfo, list, reviewCards;
    console.log('ReviewRes this.props.review', this.props.review)
    console.log('ReviewRes this.props.review.mainSearch', this.props.review.mainSearch)
    console.log('ReviewRes this.props.search', this.props.search)
    console.log('ReviewRes this.props.review.state', this.props.review.state)
    // console.log('ReviewRes this.props.review.state.mainSearch', this.props.review.state.mainSearch)
    if(this.props.review.mainSearch === undefined){
      var { searchWord, lat, long, distance, filter } = this.props.review.state.mainSearch
    }
    else{ 
      var { searchWord, lat, long, distance, filter } = this.props.review.mainSearch
    }
		if (this.props.search === true) {
      console.log('ReviewRes true안에 ', this.props.review.review)
      if(this.props.review.review === undefined){
        resInfo = this.props.review.state.review.find(s => 
          (s.searchWord === searchWord) && 
          (s.distance === distance) && 
          (s.filter === filter) && 
          (s.lat === lat) && 
          (s.long === long))
      }else{
        resInfo = this.props.review.review.find(s => 
          (s.searchWord === searchWord) && 
          (s.distance === distance) && 
          (s.filter === filter) && 
          (s.lat === lat) && 
          (s.long === long))
      }
      
      list = resInfo.list
      console.log('ReviewRes list', list)
      // if ( this.props.filter.includes('Star') ) { // 별점
      //   console.log(list)
      //   list = list.sort((a, b) => b.review.rstarrating - a.review.rstarrating)
      // } else if (this.props.filter.includes('Review')) {  // 도움이
      //   list = list.sort((a, b) => b.review.rtotalgood - a.review.rtotalgood )
      // }
      reviewCards = list.map(r => <ReviewInfoCard hospitalData={r} key={`newCard${r.review.rcode}`}/>)
      // reviewCards = {reviewData}.reviewData.map(r => <ReviewInfoCard hospitalData={r} key={`newCard${r.hcode}`}/>)
    } else {
      return (
        reviewCards = null
      )
    }
    return (
      <div>
        {reviewCards}
      </div>
    )

  }
}

const mapStateToProps = state => {
	return {
		review: state.review,
		search: state.status.reviewSearch
	};
};



const mapDispatchToProps = dispatch => {
	return {
		mainSearch: (searchWord, lat, long, distance, filter) => dispatch(review.mainSearch(searchWord, lat, long, distance, filter))
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(ReviewRes);