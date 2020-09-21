import React from "react";

import { connect } from "react-redux";
import { hos, review } from '../../actions'

import HosRes from './HosRes';
import ReviewRes from './ReviewRes';
import BigMap from './BigMap';

import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import history from "../../history";

import styles from './mystyle.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)

class ResTab extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			curr: this.props.curr,
			near: true,
			filter: 'nearHos',
			map: false
		}
	}

	async changeNearFilter() {
		const { near, filter } = this.state
		await this.setState({near: !near})
		if ( this.state.near === false ) {
			if (filter === 'nearHos') {
				await this.setState({near: true})
			} else if (filter === 'nearHosByReview') {
				await this.setState({filter: 'hosByReview'})
			} else if (filter === 'near') {
				await this.setState({filter: 'hosByStar'})
			}
		} else {
			if (filter === 'hosByReview') {
				await this.setState({filter: 'nearHosByReview'})
			} else if (filter === 'hosByStar') {
				await this.setState({filter: 'nearHosByStar'})
			}
		}
		const {searchWord, lat, long, category} = this.props.hos.mainSearch
		await this.props.mainSearch(searchWord, lat, long, category, this.state.filter)
	}

	async changeFilter(filter) {
		const {searchWord, lat, long, category} = this.props.hos.mainSearch
		if (filter === 'hosByWord') {
			if (filter === this.state.filter) {
				filter = 'hosByWord'
			} 
		} else {
			if (filter === this.state.filter) {
				filter = 'nearHos'
				await this.setState({near:true})
			} else {
				if ( this.state.near === false ) {
					if ( filter === 'nearHosByStar' ) {
						filter = 'hosByStar'
					} else if (filter === 'nearHosByReview') {
						filter = 'hosByReview'
					}
				}
			}
		}

		await this.setState({filter: filter})
		await this.props.mainSearch(searchWord, lat, long, category, this.state.filter)
	}

	async goMap() {
		await this.setState({map: !this.state.map})
		console.log(this.state.map)
	}

	async setSearchFlag(flag) {
		await this.props.searchFlag(flag)
	}

	render() {
		console.log(this.props.hos)
		const { curr, near, map } = this.state
		const { filter } = this.props.hos.mainSearch
		const floating = (map === true) ? <ListIcon/> : <MapIcon/>
		let hosfilterbar
		if (curr === 'hos') {
			hosfilterbar = <>
			<div className={near === true ? cx('tab-box', 'active-tab') : cx('tab-box')} onClick={() => this.changeNearFilter()}><p>3km 이내</p></div>
			<div className={filter.includes('Star') ? cx('tab-box', 'active-tab') : cx('tab-box')} onClick={() => this.changeFilter('nearHosByStar')}><p>별점순</p></div>
			<div className={filter.includes('Review') ? cx('tab-box', 'active-tab') : cx('tab-box')} onClick={() => this.changeFilter('nearHosByReview')}><p>도움이됐어요순</p></div>
			</>
		} else {
			hosfilterbar = null
		}
			
		
		let resDisplay
		if (curr === 'hos') {
			if (map === true) { resDisplay = <BigMap/> } else { resDisplay = <HosRes/> }
		} else { resDisplay = <ReviewRes filter={this.state.filter} /> }
		return (
			<div className={cx('res-page')}>
				<div className={cx('tab-container')}>
					<div className={curr === 'hos' ? 
						cx('cate-btn', 'passive-cate') : cx('cate-btn')}
						onClick={() => {this.setState({curr:'review'})
						this.setSearchFlag('review')
					}}
						><p>REVIEW</p></div>
					<div className={cx('spacer')}></div>
					<div className={curr === 'hos' ?
						cx('cate-btn') : cx('cate-btn', 'passive-cate')}
						onClick={() => {this.setState({curr:'hos'})
						this.setSearchFlag('hos')
					}}
						><p>HOSPITAL</p></div>
				</div>
				<div className={(filter === 'hosByWord')&&(this.state.curr === 'hos') ? 
				cx('hide') : cx('tab-container')}>
					{ hosfilterbar }
					
				</div>
				<div className={cx('res-box')}>
					{resDisplay}
				</div>
				<div className={this.state.curr === 'hos' ? cx('map-btn') : cx('hide')}
				onClick={this.goMap.bind(this)}>
					{floating}
				</div>
			</div>
		)

	}
}

const mapStateToProps = state => {
	return {
		hos : state.hos,
		curr : state.status.searchFlag
	};
};

const mapDispatchToProps = dispatch => {
	return {
		mainSearch: (searchWord, lat, long, category, filter) => dispatch(hos.mainSearch(searchWord, lat, long, category, filter)),
		searchFlag: (flag) => dispatch(review.SearchFlag(flag))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ResTab);


