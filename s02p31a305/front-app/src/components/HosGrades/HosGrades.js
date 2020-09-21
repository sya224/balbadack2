import React, { Component } from "react";
import Rating from '@material-ui/lab/Rating';
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'

import { connect } from 'react-redux'
import { review } from '../../actions'


const cx = classNames.bind(styles)

class HosGrades extends Component {
 
  render() {
    const ratings = this.props.grade.map(
      (r, i) =>
        <div className={cx('rating-box')} key={i}>
          <p className={cx('box-item')}>{r.name}</p>
          <Rating 
            name={r.name} 
            value={parseInt(r.score)} 
            size="small"
            precision={0.5}
            onChange={ e => {
              if (this.props.editable === true) {
                this.props.setHosScore(e.target.name, parseInt(e.target.value), i)
              }
            }}
          />
        </div>
    )
    return (
      <div>
        {ratings}
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setHosScore: (name, score, i) => {
      dispatch(review.setHosScore(name, score, i))
      dispatch(review.getTotalGrade())
    },
    getTotalGrade: () => dispatch(review.getTotalGrade())
  };
};


export default connect(
  null,
  mapDispatchToProps
)(HosGrades)
