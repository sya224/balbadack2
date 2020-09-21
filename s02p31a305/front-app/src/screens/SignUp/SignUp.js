/*global kakao*/
import React, { Component } from "react";
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'
import history from "../../history";
import { connect } from "react-redux";
import { user } from '../../actions';
const cx = classNames.bind(styles)

class SignUp extends Component {
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
            c_log: 1,
            username: '',
            password: '',
            password2: '',
            hasError: false
        };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true }
    }
    ValidateEmail() {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.username)) {
            return true
        } else {
            return false
        }
    }
    validatePwd() {
        if (this.state.password.length < 8 ) {
            return false
        } else {
            if (this.state.password === this.state.password2) {
                return true
            } else {
                return false
            }
            
        }
    }
    async handleSummit() {
        if (this.state.hasError) {
            window.alert('회원가입 과정에서 문제가 발생했습니다. 다시 시도해보세요.')
            await this.setState({username: '', password: '', hasError:false})
        } else {
            const validEmail = this.ValidateEmail()
            const validPwd = this.validatePwd()
            if ( ( validEmail === true ) & ( validPwd === true ) ) {
                console.log(this.state.username, this.state.password)
                await this.props.register(this.state.username, this.state.password)
                window.alert('회원가입이 완료되었다냥')
                history.push('/')
            } else {
                window.alert('형식을 지켜달라냥')
            }
        }
    }
    render() {
        return (
            <div className={cx('container')}>
                <div className={cx('category')}><p>Sign Up</p></div>

                <div className={cx('basic-box')}>
                    <p>이메일</p>
                    <input 
                        type="text" 
                        className={cx('input-box')} 
                        placeholder="이메일을 입력해주세요" 
                        onChange={(e) => this.setState({username: e.target.value})}></input>
                    <p>비밀번호</p>
                    <input 
                        type="text" 
                        className={cx('input-box')} 
                        placeholder="8자 이상의 비밀번호를 입력해주세요" 
                        onChange={(e) => this.setState({password: e.target.value})}></input>
                    <p>비밀번호 확인</p>
                    <input 
                        type="text" 
                        className={cx('input-box')} 
                        placeholder="비밀번호를 다시 입력해주세요" 
                        onChange={(e) => this.setState({password2: e.target.value})}></input>
                    <div className={cx('border-button')} onClick={() => this.handleSummit()}>
                        <p>가입</p>
                    </div>
                    <p>이미 회원이라면 <a onClick={() => history.push('/SignUp')}>로그인</a>하러가기</p>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        user: state.user.user
    };
};

const mapStateToDispatch = dispatch => {
    return {
        register: (id, pwd) => {dispatch(user.register(id, pwd))},
        logOut: () => {dispatch(user.logOut())}
    }
}

export default (connect(mapStatetoProps, mapStateToDispatch)(SignUp));