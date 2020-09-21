import React from "react";
import GradeBox from '../../components/HosGrades/GradeBox'
import ReviewPrice from '../../components/ReviewPrice/ReviewPrice'
import styles from './mystyle.module.scss';
import ThumbIcon from '@material-ui/icons/ThumbUpAlt';
import SportsIcon from '@material-ui/icons/Sports';
import classNames from 'classnames/bind';
import history from '../../history';
const cx = classNames.bind(styles)

class ReviewDetail extends React.Component {
  componentDidMount() {
    // review.getHosReview(10)
  }

  constructor(props) {
    super(props);
    console.log('ReviewDetail state', this.props.location.state)
    console.log('ReviewDetail reviewData', this.props.location.state.reviewData)
    console.log('ReviewDetail careinfoData', this.props.location.state.careinfoData)
    const reviewData = this.props.location.state.reviewData
    const scorelist = [reviewData.rclean, reviewData.rkindness, reviewData.rresult, reviewData.rprofessionality, reviewData.rovertreatment]
    // const scorelist =  [3, 4, 5 ,3,1]
    const scorelabel = ['청결', '친절함', '치료결과', '전문성', '적정한 치료']
    const grade = scorelist.map((g, i) => ({ name: scorelabel[i], score: g }))
    const totalgrade = this.calcTotalScore(scorelist)
    this.state = {
      grade: grade,
      totalgrade: totalgrade,
      editablegrade: false,
    };

  }

  calcTotalScore(scorelist) {
    const totalscore = Math.round(((scorelist.reduce((a, b) => a + b, 0) / scorelist.length) + Number.EPSILON) * 100) / 100
    const totalgrade = [{ name: '평균평점', score: totalscore }]
    return totalgrade
  }
  gotoHosDetail() {
    let localhos = this.props.location.state.reviewData.hospital
    history.push(`/hosDetail`, {localhos})
  }
  render() {
    console.log('ReviewDetail state', this.props.location.state)
    console.log('ReviewDetail reviewData', this.props.location.state.reviewData)
    console.log('ReviewDetail careinfoData', this.props.location.state.careinfoData)
    const photo1 = this.props.location.state.reviewData.rphoto1
    const photo2 = this.props.location.state.reviewData.rphoto2
    const photo3 = this.props.location.state.reviewData.rphoto3
    // const photos = photolist.map(
    //   p => (
    //     <img className={cx('photo')} src={p} key={p} alt={p}/>
    //   )
    // )

    const totallike = this.props.location.state.reviewData.rtotalgood
    // const tags = []

    // for (const [index, value] of this.props.location.state.reviewData.tags.entries()) {
    //   console.log('ReviewDetail value',value)
    //   tags.push(<div className={cx('tag')} key={index}>#{value}</div>)
    // }

    return (
      <div className={cx('container')}>
        <div className={cx('tag-box')}>
          <div onClick = {() => this.gotoHosDetail()} >
            #{this.props.location.state.reviewData.hospital.hname}
          </div>

          {/* {tags} */}
        </div>
        <div className={cx('meta-box')}>
          {/* <p>{this.props.location.state.reviewData.rtreatmentdata} 진료</p> */}
          <p>{this.props.location.state.reviewData.rdate.substr(0, 10)} 작성</p>
          방문 목적 : {this.props.location.state.reviewData.rpurpose}
        </div>
        <div className={cx('number')}>
          <div className={cx('icon-box')}>
            <SportsIcon fontSize="small" />
            <p>신고다옹</p>
          </div>
          <div className={cx('icon-box')}>
            <ThumbIcon fontSize="small" />
            <p>좋다옹 {totallike}</p>
          </div>
        </div>
        <div className={cx('category')}><p>병원상세평가</p></div>
        <GradeBox
          grade={this.state.grade}
          dojang={this.props.location.state.reviewData.rrevisit}
          totalgrade={this.state.totalgrade}
          editable={this.state.editablegrade}
        />
        <div className={cx('category')}><p>진료 후기 상세</p></div>
        <div className={cx('basic-box')}>
          * 이 리뷰는 예시입니다.
          <p>
            {this.props.location.state.reviewData.rcontent}
          </p>
        </div>
        {/* <div className={cx('category')}><p>사진후기</p></div> */}
        {/* <div className={cx('photo-box')}> */}
        {/* {photos} */}
        {/* <img className={cx('photo')} src={photo1} key={photo1} alt="사진1"/>
          <img className={cx('photo')} src={photo2} key={photo2} alt="사진2"/>
          <img className={cx('photo')} src={photo3} key={photo3} alt="사진3"/>
        </div> */}
        {/* <div className={cx('category')}><p>비용표</p></div>
        <div className={cx('price-box')}>
          <ReviewPrice careinfo={this.props.location.state.careinfoData}/>
        </div> */}
      </div>
    )
  }
}


export default ReviewDetail;


