/*global kakao*/
import React, { Component } from "react";
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'
import { connect } from "react-redux";
import { user } from '../../actions';
import history from "../../history";
const cx = classNames.bind(styles)

class SignInPage extends Component {
    componentDidMount() {
        if (JSON.stringify(this.props.user) !== '{}') {
            const r = window.confirm('이미 로그인했다냥, 로그아웃할거냥')
            if (r === true) {
                this.props.logOut()
            } else {
                history.push('/')
            }
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hasError: false,
        };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    async handleSummit() {
        if (this.state.hasError) {
            window.alert('로그인 과정에서 문제가 발생했습니다. 다시 시도해보세요.')
            await this.setState({username: '', password: '', hasError:false})
        } else {
            await this.props.signIn(this.state.username, this.state.password)
            window.alert('로그인되었다냥')
            history.push('/')
        }
    }
    render() {
        return (
            <div className={cx('container')}>
                <div className={cx('category')}><p>Sign In</p></div>
                <div className={cx('basic-box')}>
                    <p>이메일</p>
                    <input
                        type="text"
                        className={cx('input-box')}
                        placeholder="이메일을 입력해주세요"
                        onChange={(e) => this.setState({ username: e.target.value })}></input>
                    <p>비밀번호</p>
                    <input
                        type="text"
                        className={cx('input-box')}
                        placeholder="비밀번호를 입력해주세요"
                        onChange={(e) => this.setState({ password: e.target.value })}></input>
                    <div className={cx('border-button')} onClick={() => this.handleSummit()}>
                        <p>로그인</p>
                    </div>
                    <p>아직 회원이 아니라면 <a onClick={() => history.push('/SignUp')}>회원가입</a>하러가기</p>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        user: state.user.user
    }
};

const mapDispatchToProps = dispatch => ({
    signIn: (uid, pwd) => dispatch(user.signIn(uid, pwd)),
    logOut: () => dispatch(user.logOut())
})

export default (connect(mapStatetoProps, mapDispatchToProps)(SignInPage));