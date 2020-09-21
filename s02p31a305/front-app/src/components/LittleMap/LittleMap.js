/*global kakao*/

import React, { Component } from 'react';
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

class LittleMap extends Component {

    componentDidMount() {
        const script = document.createElement('script');
        script.async = true;
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=e78c23fbd9656d2db2f5df69fb693cfb&autoload=false";
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                let el = document.getElementById('map');

                let map = new kakao.maps.Map(el, {
                    center: new kakao.maps.LatLng(this.props.lat, this.props.long),
                    level: 3
                });
                var markerPosition  = new kakao.maps.LatLng(this.props.lat, this.props.long); 
                var marker = new kakao.maps.Marker({
                    position: markerPosition,
                })
                marker.setMap(map);
            });
        };
    }

    render() {
        return (
            <div className={cx('map')} id="map"></div>
        );
    }
}

export default LittleMap;