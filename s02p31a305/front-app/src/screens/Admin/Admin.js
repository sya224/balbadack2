import React, { Component } from "react";
import {review} from "../../actions";
import { connect } from "react-redux";
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
class Admin extends Component {
    componentDidMount() {
       this.props.recieveReviewReport();
    }

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    HandleDelete(r_code) {
        this.props.deleteReview(r_code);

    }
    setListReported() {
        console.log('---setlist---')

    }
    render() {
    //    this.props.recieveReviewReport();
       console.log(this.state)
       console.log(this.props.reportedReview)
       this.setListReported();
        return (
            <div>
                <div className={cx('row')}>
                    <div className={cx('small-col')}>
                    </div>
                    <div className={cx('spacer')}></div>
                </div>
                <div className={cx('category')}>
                    <p>신고된 리뷰 </p>
                </div>
                <div>
                </div>
                <div className={cx('category')}>
                    <p>인증된 병원</p>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
      reportedReview: state.review
    };
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        recieveReviewReport: () => dispatch(review.recieveReviewReport()),
        deleteReview: (r_code) => dispatch(review.deleteReview(r_code)),
    }
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Admin)
  
  