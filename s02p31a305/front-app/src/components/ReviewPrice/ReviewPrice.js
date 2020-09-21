import React, { Component } from "react";
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class ReviewPrice extends Component {
  render() {
    const price = this.props.careinfo.map(
      ci => (
        <div className={cx('price-box')} key={ci.ciCode}>
          <p className={cx('menu')}>{ci.ciName}</p>
          <p className={cx('price')}>{ci.ciPrice}원</p>
        </div>
      )
    )
    return (
      <div>
        {price}
      </div>
    );
  }
}



export default ReviewPrice;
