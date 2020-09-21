import React from 'react';
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind';
import history from'../../history';

const cx = classNames.bind(styles)

const HosInfoCard = props => {
  let {hname, haddress, hospitalPicture, htag, hstarrating, hreviewCount} = props.hospitalData;
  const localhos= props.hospitalData;
  console.log(props.hospitalData)
  function handleOnClick() {
    console.log("=====here=====")
    console.log(localhos)
    console.log(props.hospitalData)
    console.log("=====there=====")
    history.push("/HosDetail", { localhos })
  }
  const hosImage = ((hospitalPicture !== null) && (hospitalPicture.length > 0)) ? 
  <img className={cx('hos-photo')} src={hospitalPicture[1].himage}/>
  : <img className={cx('hos-photo')} src={require('../../assets/imgA.png')}/>
  let tagList, ing
  if (htag !== null) {
    if (htag.length > 0) {
      ing = htag.replace('a', '')
      if (ing.includes('n')) {
        ing = ing.replace('n', '').split('|')[0]
      }
    }
    tagList = ing.split('#').map((i, ii) => (
      <div key={`${i}_${ii}`} className={cx('tag')}>#{i}</div>
    ))
  } else {
    tagList = null
  }

  return (
      <div className={props.map === false ? cx('container-box') : cx('container-box', 'map-info-box')} onClick={() => handleOnClick()}>
        <div className={cx('box-header')}>
          <div className={cx('hos-name')}>
            <p>{hname}</p>
          </div>
          <div className={cx('box-body')}>

            <div className={cx('meta-box')}>
              <img className={cx('hos-icon')} src={require('../../assets/star.png')}/>
              <p>평점 : {hstarrating}점</p>
              <img className={cx('hos-icon')} src={require('../../assets/review4.png')}/>
              <p>리뷰 : {hreviewCount === null ? 0 : hreviewCount}개</p>
            </div>

            <div className={cx('tag-box')}>
              {tagList}
            </div>
            <p className={cx('hos-address')}>{haddress}</p>

        </div>


        </div>
          <div className={cx('hos-photo-box')}>
            {hosImage}
          </div>
      </div>
  );
}

export default HosInfoCard