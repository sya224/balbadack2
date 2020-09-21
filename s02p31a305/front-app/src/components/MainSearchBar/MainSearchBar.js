import React, { Component } from "react";
import { connect } from "react-redux";
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'
import SearchIcon from '@material-ui/icons/Search'
import history from "../../history";
import { hos } from '../../actions'
import { useLocation } from 'react-router-dom'
const cx = classNames.bind(styles)

class MainSearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			word: props.loca ? props.keyword : ''
		}
	}
	async handleEnter(e) {
    if (e.key === 'Enter') {
      await this.getSearchResult()
    }
	}
	
	async getSearchResult() {
		await this.props.mainSearch(this.state.word, null, null, 'hosByWord', 'hosByWord')
		history.push('/ResTab')
	}

	render() {
		return (
			
			<div 
				className={
					this.props.location === ('Main') ? 
					cx('search-box', 'main-search')
					: cx('search-box', 'res-search')}>
				<input 
					type="text"
					placeholder="병원이름, 진료명, 지역, 동물 종류 등"
					onChange={(e) => this.setState({word:e.target.value})}
					onKeyPress={this.handleEnter.bind(this)}
					value={this.state.word}
				/>
				<div 
					className={cx('search-btn')}
					onClick={this.getSearchResult.bind(this)}
				>
					<SearchIcon style={{ fontSize: 23 }} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		keyword : state.hos.mainSearch.searchWord
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
)(MainSearchBar)