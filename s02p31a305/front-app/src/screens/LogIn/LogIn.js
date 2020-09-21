/*global kakao*/
import React, { Component } from "react";
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class LogIn extends Component {
    componentDidMount() {

    }
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        console.log("======SignIn======")
        return (
            <div className={cx('container')}>
                <div className={cx('category')}><p>Sign In</p></div>

                <div className={cx('basic-box')}>
                    <p>아이디</p>
                    <input type="text" className={cx('input-box')} placeholder="Your Id.."></input>
                    <p>비밀번호</p>
                    <input type="text" className={cx('input-box')} placeholder="Your Password.."></input>
                    <div className={cx('border-button')}>
                        <p>로그인</p>
                    </div>
                </div>
            </div>
        );
    }
}



export default LogIn;


