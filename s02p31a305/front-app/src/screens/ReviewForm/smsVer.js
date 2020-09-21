import React, { Component } from 'react';
import firebase from '../../apis/firebase';
import { connect } from 'react-redux'
import { user } from '../../actions';
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
class smsVer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      random: '',
      verifying: false,
      error: false,
      ver_num: '',
    };
  }
  async onSubmit () {
    console.log('smsVer this.state.message', this.state.message)
    const number = '+82' + this.state.message.substr(1, 10);
    console.log('before')
    const recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
    console.log('middle')
    const res = await firebase.auth().signInWithPhoneNumber(number, recaptcha)
    console.log('after')
    const code = prompt('Enter the otp', '')
    console.log('final')
    const final = res.confirm(code)
    if (final) {
      await this.props.updateUser(true)
      await this.props.reviewIng('isSms', false)
    }
  }

  render() {
    return (
      <div className={cx('modal')}>
        <h3 className={cx('modal-header')}>번호 인증하기</h3>
        <div className={cx('h-spacer')}></div>
        <div className={cx('auth-body')}>
          <input
              className={cx('input-box')}
              type="tel"
              placeholder='번호만 입력해주세요'
              value={this.state.message}
              onChange={(e) => 
                this.setState({message: e.target.value})}
            />
          <div id="recaptcha"></div>
          <div className={cx('h-spacer')}></div>
          <div className={cx('border-button')} onClick={() => this.onSubmit()}> 인증번호 전송 </div>
        </div>
      </div>

    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user.user,
    userUpdated: state.userUpdated,
    myPage: state.user.myPage,
    isSearching: state.status.isSearching,
    isSms: state.status.isSms,
    isReciepting: state.status.isReciepting,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (body) => dispatch(user.updateUser(body)),
    reviewIng : (now, code) => dispatch(user.reviewIng(now, code))
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(smsVer)
