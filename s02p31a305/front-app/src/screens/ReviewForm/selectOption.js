import React from "react";
import history from "../../history";

import Modal from '@material-ui/core/Modal';

import recieptHelper from '@ming822/ocr-reciept-helper'
import vision from 'react-cloud-vision-api'
import SmsVer from './smsVer.js'
import resJson from './test2.json'

import { connect } from 'react-redux'
import { review, user, hos } from '../../actions'

import SearchIcon from '@material-ui/icons/Search'
import Pets from '@material-ui/icons/Pets'
import EmojiPeople from '@material-ui/icons/EmojiPeople'

import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'


const cx = classNames.bind(styles)

class selectOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reciept: null,
      searchWord: '',
      currStage: 0,
    }
  }

  async handleEnter(e) {
    if (e.key === 'Enter') {
      this.showList()
    }
  }

  async componentDidMount() {
    let stage

    if ((this.props.user.myPage !== null) || (this.props.user.myPage !== undefined)) {
      if (this.props.user.myPage.usms === false) { stage = 0} 
      else if (this.props.hosInfo === null) { stage = 1 } 
      else if (this.props.review.reciept === null) { stage = 2 } 
      else { stage = 3 }
    } else {
      stage = -1
    }
    await this.setState({currStage: stage})
  }

  async showList() {
    await this.props.getHosSearchList(this.state.searchWord)
  }

  async handleHos(l) {
    await this.props.setHosInfo(l.hcode, l.hname, l.haddress)
    await this.setState({ searchWord: '' })
    await this.props.reviewIng('isSearching', false)
  }

  async handleHosFirst(e) {
    if (!this.props.hosInfo === null) {
      alert('동물 병원을 먼저 검색해주세요')
      e.preventDefault()
    }
  }

  async handleReciept(e) {
    const files = [...e.target.files]
    await this.setState({ reciept: files[0] })
    await this.processFile(files[0])
  }

  async processFile(file) {
    const reader = new FileReader()
    const context = this
    await reader.readAsDataURL(file)
    reader.onload = await async function () {
      await context.ocrApi(file, reader.result)
    } 
  }
  

  async ocrApi(file, recieptBase64) {
    const key = 'AIzaSyDdgPBg9Srr4GjiCgLxrLvCk9GkzCcn0Qs'
    await vision.init({ auth: key })
    const req = await new vision.Request({
      image: new vision.Image({
        base64: recieptBase64
      }),
      features: [
        new vision.Feature('TEXT_DETECTION', 4)
      ]
    })
    const res = await vision.annotate(req)
    console.log(res)
    const resJson = res.responses[0]
    console.log(resJson)
    const reciept = new recieptHelper(resJson, '스토리동물병원')

    // const reciept = new recieptHelper(resJson[0], '스토리동물병원')
    const isDate = reciept.dateInfo.length > 0
    const hasPlace = reciept.isPlaceName
    console.log(isDate, hasPlace)
    if (isDate & hasPlace) {
      console.log('yes')
      await this.props.uploadReciept(file, isDate, hasPlace, reciept.priceTable)
      await this.props.reviewIng('isReciepting', true)
    } else {
      alert('영수증에 날짜 정보나 병원 이름이 보이지 않다냥 8-8')
    }
  }



  render() {
    if ((this.props.user.myPage !== null) && this.props.user.myPage !== undefined) {
      console.log(this.props, '--------------------')
      const {isSearching, isSms, isReciepting } = this.props
      const hosSearch = this.props.hosInfo !== null ? '동물병원 재검색하기' : '동물병원 검색하기'
      const stageDojang = []
      for (let i = 0; i < 3; i++ ) {
        if (i < this.state.currStage) {stageDojang.push(<td key={i}><Pets/></td>)}
        else {stageDojang.push(<td></td>)}
      }
      let searchResult
      if ((this.props.hosSearchList !== null) && (this.props.hosSearchList !== undefined) ) {
        const mySearch = this.props.hosSearchList.find(h => h.searchWord === this.state.searchWord)
        if (this.props.search === true) {
          if ((mySearch !== null) && (mySearch !== undefined)) {
            searchResult = mySearch.list.map(l =>
              <div
                className={cx('search-list-box')}
                onClick={() => this.handleHos(l)}
                key={l.hcode}
              >
                <p>{l.hname}</p>
                <p className={cx('small-text')}>{l.haddress}</p>
              </div>
            )} else { searchResult = null }}
          else {
            searchResult = null
          }
      } else {
        searchResult = null
      }
      
      let carebody
      if (this.props.myreciept !== null ) {
        const carelist = this.props.myreciept.items.map( (r, i) =>
          <div key={`ci-${i}`}>{r.join(' | ')}</div>
        )
        carebody = (
          <div className={cx('modal')}>
            <h3 className={cx('modal-header')}>내 영수증 확인하기</h3>
            <div className={cx('reciept-body')}>
              {carelist}
            </div>
            <div className={cx('h-spacer')}></div>
            <div 
              className={cx('border-button', 'xsmall-btn')}
              onClick={() => this.props.reviewIng('isReciepting', false)}
            >
            확인
            </div>
          </div>
        )
      } else {
        carebody = null
      }
  
  
  
  
      const body = (
        <div className={cx('modal')}>
          <h3 className={cx('modal-header')}>동물병원 검색하기</h3>
          <div className={cx('search-box')}>
            <input
              type='text'
              className={cx('modal-search-bar')}
              value={this.state.searchWord}
              onChange={e => this.setState({ searchWord: e.target.value })}
              onKeyPress={this.handleEnter.bind(this)}
            />
            <div
              className={cx('search-btn')}
              onClick={this.showList.bind(this)}
            >
              <SearchIcon style={{ fontSize: 15 }} />
            </div>
          </div>
          <div className={cx('h-spacer')}></div>
          <div className={cx('modal-body')}>
            {searchResult}
          </div>
          <div className={cx('h-spacer')}></div>
        </div>
      );
      const timerightnow = new Date().toISOString().slice(0, 10)
      return (
  
        <div>
          <div className={cx('category')}>
            <p>리뷰 작성 가이드</p>
          </div>
          <div className={cx('indented-row')}>
            <p>
              <span className={cx('stress-text')}>발바닥</span>
                은 사용자분들의 정보 공유를 통해 이루어지는 서비스로
                <span className={cx('stress-text')}> 신뢰성</span>
                있는 리뷰를 위해 다음과 같은
                <span className={cx('stress-text')}>2 단계의 인증 절차</span>
                를 두었습니다.
              </p>
          </div>
          <div className={cx('row')}>
            <div className={cx('small-col', 'step-box')}>
              <div className={cx('box-header')}>
                <img
                  className={cx('num-icon', 'one-icon')}
                  src={require('../../assets/one.png')}
                  alt='one' />
                <p>본인 인증</p>
              </div>
              <div className={cx('box-content')}>
                <img
                  className={cx('info-icon')}
                  src={require('../../assets/smartphone.png')}
                  alt='smartphone' />
                <div className={cx('small-divider')}></div>
                <p className={cx('content-header')}>[ 중복 리뷰 방지 목적 ]</p>
                <p>이름, 생년월일, 핸드폰 번호로 본인 인증</p>
                <p>최초 한번의 인증만 필요</p>
              </div>
  
            </div>
            <div className={cx('spacer')}></div>
            <div className={cx('small-col', 'step-box')}>
              <div className={cx('box-header')}>
                <img
                  className={cx('num-icon', 'two-icon')}
                  src={require('../../assets/two.png')}
                  alt='two' />
                <p>영수증 인증</p>
              </div>
              <div className={cx('box-content')}>
                <img
                  className={cx('info-icon')}
                  src={require('../../assets/reciept.png')}
                  alt='reciept' />
                <div className={cx('small-divider')}></div>
                <p className={cx('content-header')}>[ 진실한 리뷰 목적 ]</p>
                <p>날짜와 동물병원 이름이 표기된 영수증으로 인증</p>
                <p>영수증 비용 자동 입력</p>
              </div>
            </div>
          </div>
  
          <div className={cx('h-spacer')}></div>
          <div className={cx('row')}>
            <p className={cx('small-text')}>
              리뷰는 <span className={cx('red-text')}>객관적</span>이고 <span className={cx('red-text')}>진실</span>하며 <span className={cx('red-text')}>공공의 이익</span>을 위해야하며
                특정인이나 단체를 <span className={cx('red-text')}>비방</span>할 목적이 아니어야합니다.
                이를 지키지 않을 경우 <span className={cx('red-text')}>명예훼손</span> 등의 법적 문제가 사용자에게 발생할 수 있으며,
                다른 사용자로부터 신고요청이 들어올 경우 <span className={cx('red-text')}>서비스 이용이 중지</span>될 수 있습니다.
              </p>
          </div>
          <div className={cx('big-divider')}></div>
          <div className={cx('h-spacer')}></div>
          <div className={cx('category')}>
            <p>리뷰 전 인증 하기</p>
          </div>
          <div className={cx('ticket-box')}>
            <div className={cx('ticket-body')} >
              <p>------ 발품팔지 않고 만나는 애니멀 닥터 ------</p>
              <div className={cx('ticket-decor')}>
                <table>
                  <thead>
                    <tr>
                      <th>본인인증</th>
                      <th>병원검색</th>
                      <th>영수증인증</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      { stageDojang }
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>------------ 발행일 : {timerightnow} ------------</p>
            </div>
  
            <div className={cx('submit-box')}>
              <div className={cx('decor-top')}></div>
              <div className={cx('decor-inner')}>
                <p>리뷰 쓰기</p>
              </div>
              <div className={cx('decor-bottom')}></div>
            </div>
            
          </div>
          <div className={this.state.currStage === 0 ? cx('action-box') : cx('hide')}>
            <div className={this.props.user.myPage.usms === true? 
              cx('hide') : cx('border-button', 'smaller-btn')}
              onClick={() => this.props.reviewIng('isSms', true)}>
              핸드폰 인증하기
            </div>
            
            <div className={this.props.user.myPage.usms === true? cx('auth-box') : cx('hide')}>
              <EmojiPeople/>
              <div>
                <p>{this.props.user.email} 님</p>
                <p>인증되었다냥!</p>
              </div>            
            </div>
            <div 
              className={this.props.user.myPage.usms === true? cx('border-button', 'xsmall-btn') : cx('hide')}
              onClick={() => this.setState({currStage: this.state.currStage + 1})}
            >
              다음
            </div>
          </div>
  
          <div className={this.state.currStage === 1 ? cx('action-box') : cx('hide')}>
            <div className={cx('border-button', 'smaller-btn')} 
            onClick={() => this.props.reviewIng('isSearching', true)}>
              {hosSearch}
            </div>
            <div className={this.props.hosInfo !== null ? cx('hos-box') : cx('hide')}>
              <p>{this.props.hosInfo !== null ? this.props.hosInfo.name : null}</p>
              <p className={cx('small-text')}>{this.props.hosInfo !== null ? this.props.hosInfo.address : null}</p>
            </div>
            <div 
              className={this.props.hosInfo !== null? cx('border-button', 'xsmall-btn') : cx('hide')}
              onClick={() => this.setState({currStage: this.state.currStage + 1})}
            >
              다음
            </div>
          </div>
  
          <div className={this.state.currStage === 2 ? cx('action-box') : cx('hide')}>
            <div
             className={this.state.reciept !== null? cx('hide') :
              cx('border-button', 'upload-btn-wrapper', 'smaller-btn')}
            >
              <p>영수증 인증하기</p>
              <input
                type="file"
                name="file"
                accept="image/*"
                onClick={this.handleHosFirst.bind(this)}
                onChange={this.handleReciept.bind(this)}
              />
            </div>
            <div 
              className={this.state.reciept !== null? cx('border-button', 'xsmall-btn') : cx('hide')}
              onClick={() => this.setState({currStage: this.state.currStage + 1})}
            >
              다음
            </div>
          </div>
  
          <div className={this.state.currStage === 3 ? cx('action-box') : cx('hide')}>
            <div className={cx('border-button', 'smaller-btn')} onClick={() => history.push("/ReviewForm")}>
              리뷰 쓰러가기
            </div>
          </div>
  
          <Modal
            open={isSms}
            onClose={() => this.props.reviewIng('isSms', !isSms)}
          >
            <SmsVer/>
          </Modal>
          <Modal
            open={isSearching}
            onClose={() => this.props.reviewIng('isSearching', !isSearching)}
          >
            {body}
          </Modal>
  
          <Modal
            open={isReciepting}
            onClose={() => this.props.reviewIng('isReciepting', !isReciepting)}
          >
            {carebody}
          </Modal>
  
        </div>
      );
  
  
    } else {
      return (
        <div>{null}</div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,

    myreciept: state.review.reciept,
    hosSearchList: state.hos.hosSearchList,
    status: state.status,
    search: state.status.search,
    hosInfo: state.review.hosInfo,
    isSearching: state.status.isSearching,
    isSms: state.status.isSms,
    isReciepting: state.status.isReciepting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadReciept: (file, dateIs, hasHos, items) => dispatch(review.uploadReciept(
      file,
      dateIs,
      hasHos,
      items
    )),
    setHosInfo: (id, name, address) => dispatch(review.setHosInfo(id, name, address)),
    getHosSearchList: (searchWord) => dispatch(hos.getHosSearchList(searchWord)),
    hasReciept: (has) => dispatch(review.hasReciept(has)),
    reviewIng : (now, code) => dispatch(user.reviewIng(now, code))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(selectOption)

