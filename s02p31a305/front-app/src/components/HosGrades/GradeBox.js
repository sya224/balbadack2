import React from "react";
import HosGrade from '../../components/HosGrades/HosGrades'
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'
import { connect } from 'react-redux'

const cx = classNames.bind(styles)

class GradeBox extends React.Component {

  render() {
    const dojangMark = require("../../assets/visitnyang.png")
    var {grade, editable, totalgrade, dojang} = ''
    
    if(this.props.editable === undefined){
      console.log('editable undefined')
      grade = this.props.review.grade
      editable = true
      totalgrade = this.props.review.totalgrade
      dojang = this.props.review.dojang
    }else if(!this.props.editable){
      console.log('editable false')
      grade = this.props.grade
      editable = this.props.editable
      totalgrade = this.props.totalgrade
      dojang = this.props.dojang
    }else{
      console.log('editable true')
      grade = this.props.review.grade
      editable = true
      totalgrade = this.props.review.totalgrade
      dojang = this.props.review.dojang
    }
    
    return (
        <div className={cx('basic-box', 'relative')}>
          <HosGrade 
            grade={grade}
            editable={editable}
            />
          <div className={cx('divider')}></div>
          <HosGrade grade={totalgrade}/>
          <img 
            className={dojang? cx('show') : cx('hide')} 
            src={dojang? dojangMark : undefined }
            alt='dojang' 
          />
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    review: state.review,
  };
};

export default connect(
  mapStateToProps
)(GradeBox)