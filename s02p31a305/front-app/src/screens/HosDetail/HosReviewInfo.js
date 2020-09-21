import React from 'react';
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind';
import SportsIcon from '@material-ui/icons/Sports';
import history from '../../history';
import { review } from '../../actions'
import { connect } from "react-redux";

const HosReviewInfo = props => {
  
  const reviewData = props.hospitalData
    console.log("====here===")
    console.log(reviewData.careinfo)
  const cx = classNames.bind(styles)
  var pet_data = [];
  for (var i = 0; i < reviewData.careinfo.length; i++) {
    pet_data.push({
      pet: reviewData.careinfo[i].ci_vet,
      c_name: reviewData.careinfo[i].ciName
    })
  }
  const tags = []
  // for (const [index, value] of reviewData.tags.entries()) {
  //   tags.push(<div className={cx('tag')} key={index}>#{value}</div>)
  // }
  var cont = []

  console.log(reviewData.review)
  cont = reviewData.review.rcontent.substr(0, 120)

  async function handleClick() {
    await review.recieveHosReview(reviewData)
    history.push("/ReviewDetail", {reviewData})
  }

  return (
    <>
      <div className={cx('rev-box')}>
        <div>
          {reviewData.r_nickname}
        </div>
        <div className={cx('tag-box')}>
          {tags}
        </div>
        <div>
          {reviewData.careinfo[0].ci_vet}
        </div>
        <div>
          {reviewData.careinfo[0].ciName}
        </div>


        <div>
          {cont} ...
        </div>
        <span onClick= {() => handleClick()}>더보기</span>
        <br />
      </div>
    </>    
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    recieveHosReview : (reviewData) => dispatch(review.recieveHosReview(reviewData))
  }
}

export default connect(mapDispatchToProps)(HosReviewInfo);
// export default ReviewInfoCard