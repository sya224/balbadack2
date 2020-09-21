/*global kakao*/

import React, { Component } from 'react';

import { connect } from "react-redux";
import { hos } from '../../actions'


import styles from './mystyle.module.scss';
import classNames from 'classnames/bind';

import HosInfoCard from '../../components/HosInfoCard/HosInfoCard';

const cx = classNames.bind(styles)

class BigMap extends Component {
	constructor(props) {
		super(props);
		const { searchWord, lat, long, category, filter} = props.hos.mainSearch
		if (props.hos[filter].length !== 0) {
			if (category === 'hosByLoc') {
				if (!props.hos[filter].find(s => (s.lat === lat) & (s.long === long))) {
					props.mainSearch(searchWord, lat, long, category, filter)
				}
			} else {
				if(!props.hos[filter].find(s => (s.keyword === searchWord))) {
					props.mainSearch(searchWord, lat, long, category, filter)
				}
			}
		} else {
			props.mainSearch(searchWord, lat, long, category, filter)
		}

		this.state = {
			cur_pick: null,
		};
	}

	click_marker(map, marker, hosinfo, that) {
		return function () {
			that.setState({cur_pick: hosinfo});
		}
	}

	render() {
		let result;
		const { searchWord, lat, long, category, filter} = this.props.hos.mainSearch
		if (this.props.search === true) {
			if (category === 'hosByLoc') {
				result = this.props.hos[filter].find(s => (s.lat === lat) & (s.long === long)).list
			} else {
				result = this.props.hos[filter].find(s => (s.keyword === searchWord)).list
			}
			const script = document.createElement('script');
			script.async = true;
			script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=e78c23fbd9656d2db2f5df69fb693cfb&autoload=false";
			document.head.appendChild(script);
			script.onload = () => {
				kakao.maps.load(() => {
					let el = document.getElementById('map');
	
					let map = new kakao.maps.Map(el, {
						center: new kakao.maps.LatLng(result[0].hlatitude, result[0].hlongitude),
						level: 3
					});
					var positions = [];
					for (var i = 0; i < result.length; i++) {
						positions.push({
							content: '<div> 깨깨오 </div>',
							latlng: new kakao.maps.LatLng(result[i].hlatitude, result[i].hlongitude)
						})
					}
					for (var i = 0; i < positions.length; i++) {
						var marker = new kakao.maps.Marker({
							map: map,
							position: positions[i].latlng,
							content: "aaaaaaaaa"
						})
						kakao.maps.event.addListener(marker, 'click', this.click_marker(map, marker, result[i], this));
					}
				});
			};
			let hosCard = this.state.cur_pick !== null ? 
			<HosInfoCard map={true} hospitalData={this.state.cur_pick}/> : 
			<HosInfoCard map={true} hospitalData={result[0]}/>
			return (
				<div className={cx('container')}>
					<div className={cx('map')} id="map">
					</div>
					{hosCard}

				</div>
			);

		} else {
			return (
				<div></div>
			)
		}
	}
}

const mapStateToProps = state => {
	return {
		hos : state.hos,
		search: state.status.search
	};
};

const mapDispatchToProps = dispatch => {
	return {
		mainSearch: (searchWord, lat, long, category, filter) => dispatch(hos.mainSearch(searchWord, lat, long, category, filter))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BigMap);