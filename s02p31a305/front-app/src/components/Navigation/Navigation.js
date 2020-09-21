import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PersonIcon from "@material-ui/icons/Person";
import SendIcon from "@material-ui/icons/Send";
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind';
import history from '../../history';
import MainSearchBar from '../MainSearchBar/MainSearchBar'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux';


const cx = classNames.bind(styles)

const checkCancel = () => {
  const r = window.confirm('작성하던 내용이 사라진다냥')
  if (r == true) {
    return history.goBack()
  }
}

const Navigation = (props) => {
  let middle
  let location = useLocation().pathname
  let leftBtn = <ChevronLeftIcon onClick={history.goBack} />  
  let rightBtn = JSON.stringify(props.user)  === '{}' ?
  <div className={cx('nav-icon-box')}><PersonIcon onClick={()=> history.push('/SignIn')}/></div> :
  <div className={cx('nav-icon-box')}><PersonIcon onClick={()=> history.push('/MyPage')}/></div>
    
  console.log('navigation')
  console.log(location.pathname);
  if (location === '/MyPage') {
    location = '마이페이지'
  } else if (location === '/HosDetail') {
    location = props.status.hosName + ' 병원 상세페이지'
  } else if (location === '/ReviewDetail') {
    location = [props.status.hosName, ' 후기 열람'].join(' ')
  } else if (location === '/SelectOption') {
    location = [props.status.hosName, ' 후기 작성'].join(' ')
  } else if (location === '/ReviewForm') {
    location = [props.status.hosName, ' 후기 작성'].join(' ')
    rightBtn = <div className={cx('nav-icon-box')}><SendIcon  style={{ fontSize: 19 }}/></div>
    leftBtn = <ChevronLeftIcon onClick={() => checkCancel()} />  
  } else if (location === '/LogIn') {
    location = '로그인'
  } else if (location === '/ResTab') {
    location = '/ResTab'
    leftBtn = <ChevronLeftIcon onClick={() => history.push('/')} />  
    rightBtn = null
  } else if (location === '/') {
    leftBtn = null
    location = ''
  } else {
    location = ''
  }

  if (location === '/ResTab') {
    middle = <MainSearchBar loca={location}/>
  } else {
    middle = <p className={cx('nav-title')}>{location}</p>
  }

  return (
    <div>
      <React.Fragment>
        <div className={cx('custom-nav')}>
          <div className={cx('nav-icon-box')}>{leftBtn}</div>
          {middle}
          {rightBtn}
        </div>
      </React.Fragment>
      <main>
        {props.children}
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  status: state.status,
  user: state.user.user
})

export default connect(
  mapStateToProps
)(Navigation)