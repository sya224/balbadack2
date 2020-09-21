import React from "react";
import { connect } from "react-redux";
import MainSearchBar from "../../components/MainSearchBar/MainSearchBar";
import Pets from '@material-ui/icons/Pets'
import history from "../../history";
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'
import { hos } from '../../actions'
const cx = classNames.bind(styles)

class Main extends React.Component {
  getSearchResults(word, lat, long, cateogry, filter) {
    this.props.mainSearch(word, lat, long, cateogry, filter)
    history.push('/ResTab')
  }

  getCurrentPosition () {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(resolve);
    });
  };

  async getUserLoca() {
    const position = await this.getCurrentPosition()
    const {latitude, longitude} = position.coords
    await this.props.mainSearch('', latitude, longitude, 'hosByLoc', 'nearHos')
    history.push('/ResTab')
  }

  render() {
    const getKeywords = ['중성화', '입원', '심장사상충', '응급', '검진', '소동물', '슬개', '접종', '외과', '치과']
    const keword = getKeywords.map(word => {
    return <div onClick={() => this.getSearchResults(word, null, null, 'hosByWord', 'hosByWord')} key={word}>#{word}</div>
    })
    return (
      <div>
        <div className={cx('main-container')}>
          <div className={cx('logo-box')} align="center">
            <div className={cx('phrase')}>
              <p><span>발</span>품팔지않고</p>
              <p><span>바</span>로 만나는</p>
              <p>애니멀 <span>닥</span>터</p>
            </div>
            <img 
              className={cx('logo')} 
              src={require('../../assets/veterinary.png')}
              alt='logo'/>
          </div>
          <MainSearchBar location={'Main'}/>
          <div className={cx('keyword-box')}>
            {keword}
          </div>
          <div className={cx('event-box')}>
            <div className={cx('category', 'event-header')}>
              <p>발바닥 런칭 기념 이벤트</p>
            </div>
            <div className={cx('event-body')}>
              <img
                className={cx('coffee-icon')}
                src={require('../../assets/coffee.png')}
                alt='coffee-icon'/>
              <div className={cx('event-phrase')}>
                <p>리뷰를 작성하면 추첨을 통해 스타벅스 쿠폰을 드립니다</p>
                <p
                  onClick={() => history.push('/SelectOption')} 
                  className={cx('event-title')}>리뷰 쓰러가자냥</p>
              </div>
            </div>
          </div>
        </div>
        <div 
          className={cx('quick-box')}
          onClick={this.getUserLoca.bind(this)}
        >
          <div className={cx('quick-btn')}>
            <Pets/>
          </div>
          <p>Quick Search</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hos : state.hos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    mainSearch: (word, lat, long, cateogry, filter) => dispatch(hos.mainSearch(word, lat, long, cateogry, filter)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
