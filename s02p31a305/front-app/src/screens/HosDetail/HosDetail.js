/*global kakao*/
import React, { Component } from "react";
import styles from './mystyle.module.scss';
// import "react-image-gallery/styles/scss/image-gallery.scss";
// import "react-image-gallery/styles/css/image-gallery.css";
import "./image-gallery.css";
import ImageGallery from 'react-image-gallery';
import Button from '@material-ui/core/Button';
import classNames from 'classnames/bind';
import LittleMap from "../../components/LittleMap/LittleMap";
import HosGrades from '../../components/HosGrades/HosGrades';
import history from '../../history';
import { connect } from "react-redux";
import { review, user, hos, stat } from '../../actions';
import imgA from "../../assets/imgA.png";
//썸내일은... 리사이징...
import fav1 from '../../assets/fav1.png';
import fav2 from '../../assets/fav2.png';
import ReviewInfoCard from '../../components/ReviewInfoCard/ReviewInfoCard';
import HosReviewInfo from './HosReviewInfo';
import { sample } from "rxjs-compat/operator/sample";
const reviewData = {
    r_no: 0,
    u_id: 'aestas',
    r_nickname: '익명의 코끼리',
    r_photo: 'https://lh3.googleusercontent.com/proxy/QYikpOM5d8B4H0_YTn1sfYzEQcGYjKwUtseoQXBpXqhjh3bsn04ZdeNL533bsCyivn3OzERLxq2zBPl5l9rt_UU_B6PlMBkQHef624cQ8DI0TjJkozUb8Qyhs8kYkTGclUI-uGs83FjcgEo,http://www.busan.com/nas/wcms/wcms_data/photos/2020/02/12/2020021209194665170_l.jpg,https://modo-phinf.pstatic.net/20160629_37/1467141681611RHSrJ_JPEG/mosaazDVas.jpeg?type=w1100',
    r_content: '2010년부터 다니던 병원입니다. 고양이에게 중성화 수술은 꼭 필요한 것 같아요. 계속 힘들어해서 몇 차례 검진 받고 선생님과 상담후에 중성화 수술을 하게되었습니다. 선생님 정말 친절하시고요 여기 애견용 풀도 있는 것 같아서 상처 부위 치료되면 또 오려고요!',
    r_reciept: true,
    r_treatmentdata: '2020-05-10',
    r_date: '2020-05-10',
    tags: ['중성화수술이다옹', "고양이", "15kg", '정기적', "친절", "풀장", "감사"],
    r_overtreatement: 1,
    r_kindness: 4,
    r_result: 4,
    r_clean: 4,
    r_report: 0,
    r_deleted: false,
    Like: [{ u_id: 1 }, { u_id: 2 }, { u_id: 3 }],
    careinfo: [
        {
            ci_no: 2,
            h_code: 1,
            ci_vet: '고양이',
            ci_price: 25000,
            CareList: {
                c_code: 3,
                c_name: '중성화수술',
                c_category: '수술'
            },
            r_no: 0
        },
        {
            ci_no: 3,
            h_code: 1,
            ci_vet: '고양이',
            ci_price: 30000,
            CareList: {
                c_code: 4,
                c_name: '붕대',
                c_category: '시술'
            },
            r_no: 0
        },
        {
            ci_no: 4,
            h_code: 1,
            ci_vet: '고양이',
            ci_price: 50000,
            CareList: {
                c_code: 2,
                c_name: '마취약',
                c_category: '주사'
            },
            r_no: 0
        }
    ],
    h_code: 1
}

const cx = classNames.bind(styles)
class HosDetail extends Component {
    componentDidMount() {
        this.state.current_hos = this.props.location.state.localhos;
        // console.log(this.props.location.state.localhos)
        // this.props.setPathName(this.state.current_hos.hname)
        this.props.getHosReview(this.state.current_hos.hcode);
        review.setHosInfo(this.state.current_hos.hcode, this.state.current_hos.hname, this.state.current_hos.haddress);
    }
    constructor(props) {
        super(props);
        this.state = {
            current_hos: [],
            image: [],
            chk_fav: false,
            cur_fav: false,
            grade: [
                {
                    name: '적절한 치료',
                    score: this.props.location.state.localhos.scoreOvertreatment
                },
                {
                    name: '친절함',
                    score: this.props.location.state.localhos.scoreKindness
                },
                {
                    name: '치료결과',
                    score: this.props.location.state.localhos.scoreResult
                },
                {
                    name: '청결',
                    score: this.props.location.state.localhos.scoreClean
                }
            ]
        };
        this.handlePhoneCall = this.handlePhoneCall.bind(this);
        this.handleHomePage = this.handleHomePage.bind(this);
        this.onclickfav = this.onclickfav.bind(this);
        this.setFirstFav = this.setFirstFav.bind(this);
        
    }
    async setFirstFav() {
        this.setState({
            chk_fav: true,
        })
        await this.props.getMyLikeHos(this.props.userData.myPage.uid);
        await this.props.getHosByCode(this.props.location.state.localhos.hcode);
        console.log(this.props.location.state.localhos.hname)
        this.props.setPathName(this.props.location.state.localhos.hname);
        this.setImage()
        console.log(this.props.userlike.message)
        for(var i = 0; i < this.props.userlike.message.length; i++) {
            if(this.props.location.state.localhos.hcode === this.props.userlike.message[i].hcode) {
                this.setState({
                    cur_fav: true,
                })
            }
        }
    }
    setImage() {
        console.log(this.props.hos.oneHosDetail[0])
        var hosPic = this.props.hos.oneHosDetail[0].hospitalPicture;
        if (!hosPic) {
            this.state.image.push({
                original: imgA,
                thumbnail: imgA
            })
        }
        else {
            for (var i = 0; i < hosPic.length; i += 2) {
                this.state.image.push({
                    original: hosPic[i].himage,
                    thumbnail: hosPic[i + 1].himage
                })
            }
        }
    }
    handlePhoneCall() {
        if(this.props.location.state.localhos.htel) {
            window.open(`tel:${this.props.location.state.localhos.htel}`)
        }
        else {
            window.alert("전화번호가 없다냥");
        }
        
    }
    handleHomePage() {
        if (this.props.location.state.localhos.hwebsite) {
            window.open(`${this.props.location.state.localhos.hwebsite}`);
        }
        else {
            window.alert("홈페이지 없다냥");
        }
    }
    onclickfav() {
        if (!this.state.cur_fav) {
            this.props.likeHos(this.props.location.state.localhos.hcode)
            this.setState({
                cur_fav: true,
            })
        }
        else {
            this.setState({
                cur_fav: false,
            })
        }
    }
    displayfav() {
        if (!this.state.cur_fav) {
            return <img src={fav1} className={cx('fav')} onClick={() => this.onclickfav()}></img>
        }
        else {
            return <img src={fav2} className={cx('fav')} onClick={() => this.onclickfav()}></img>
        }
    }
    setHos() {
        if (this.state.current_hos.length < 1) {
            this.state.current_hos = this.props.location.state.localhos
        }
        return (
            <>
                <div className={cx('hos-container')}>
                    <div className={cx('hos-box')}>
                        <br />
                        <div className={cx('hos-name')}>{this.state.current_hos.hname}</div>
                        <span className={cx('vet-name')}>{this.state.current_hos.hcity} <span className={cx('pipe')}>|</span> </span>
                        <span className={cx('vet-name')}>{this.state.current_hos.haddress}</span>
                    </div>
                    {this.displayfav()}
                </div>

                <div className={cx('home-container')} >
                    <button className={cx('homepage')} type="button" onClick={() => this.handleHomePage()}> 병원 홈페이지 </button>
                    <button className={cx('phone')} type="button" onClick={() => this.handlePhoneCall()}> {this.props.location.state.localhos.htel} </button>
                </div>

            </>
        );

    }
    handleOnclick() {
        history.push("/SelectOption")
    }
    setAverageGrade() {
        var avg = 0;
        for (var i = 0; i < this.state.grade.length; i++) {
            avg += this.state.grade[i].score;
        }
        return avg / 4;
    }
    clickReviewList() {
        // console.log(this.state.current_hos.hcode)
        this.props.getHosReview(this.state.current_hos.hcode)
        let localRev = this.props.reviewData;
        history.push(`/hosRevForDetail`, {localRev})
    }
    setPrice() {
        return (
            <div className={cx('grade-box')}>
                <div>
                    <p className={cx('day')} >
                        <span> 중성화(수컷) <span className={cx('pipe')}> </span>  </span>
                    </p>
                    <p className={cx('day')} >
                        <span> 중성화(암컷) <span className={cx('pipe')}> </span>  </span>
                    </p>
                    <p className={cx('day')} >
                        <span> 발치 <span className={cx('pipe')}> </span>  </span>
                    </p>
                    <p className={cx('day')} >
                        <span> 고관절 수술(대형견) <span className={cx('pipe')}> </span>  </span>
                    </p>
                    <p className={cx('day')} >
                        <span> 고관절 수술(소형견) <span className={cx('pipe')}> </span>  </span>
                    </p>
                </div>
                <div>
                    <p className={cx('day')} >
                        <span> 100,000 ~ 350,000 </span>
                    </p>
                    <p className={cx('day')} >
                        <span> 150,000 ~ 450,000 </span>
                    </p>
                    <p className={cx('day')} >
                        <span> 70,000 ~ 120,000 </span>
                    </p>
                    <p className={cx('day')} >
                        <span> 600,000 ~ 2,500,000</span>
                    </p>
                    <p className={cx('day')} >
                        <span> 400,000 ~ 2,200,000</span>
                    </p>
                </div>
            </div>

        )
    }

    setReviewList() {
        // console.log(this.props.reviewData.length)
        if(this.props.reviewData) {
            if(this.props.reviewData.length > 0) {
                return(
                    <div>
                        <HosReviewInfo hospitalData={this.props.reviewData[0]} key={`newCard${this.props.reviewData[0].review.hcode}`} />
                        <div className={cx('more-rev')} onClick={() => this.clickReviewList()}>
                            리뷰 더보기...
                            </div>
                    </div>
                    
                )
            }
            else return null
        }
        
    }
    setRunningTime() {
        if (!this.state.current_hos.hmonday) {
            this.state.current_hos.hmonday = "9:00 ~ 18:00"
        }
        if (!this.state.current_hos.htuesday) {
            this.state.current_hos.htuesday = "9:00 ~ 18:00"
        }
        if (!this.state.current_hos.hwednesday) {
            this.state.current_hos.hwednesday = "영업 안함"
        }
        if (!this.state.current_hos.hthursday) {
            this.state.current_hos.hthursday = "9:00 ~ 18:00"
        }
        if (!this.state.current_hos.hfriday) {
            this.state.current_hos.hfriday = "9:00 ~ 18:00"
        }
        if (!this.state.current_hos.hsaturday) {
            this.state.current_hos.hsaturday = "9:00 ~ 18:00"
        }
        if (!this.state.current_hos.hsunday) {
            this.state.current_hos.hsunday = "영업 안함"
        }
        return (
            <div className={cx('column-box')}>
                <p className={cx('day')} >
                    <span> 월  <span className={cx('pipe')}> </span>  </span>
                    <span> {this.state.current_hos.hmonday} </span>
                </p>
                <p className={cx('day')}>
                    <span> 화  <span className={cx('pipe')}>  </span> </span>
                    <span> {this.state.current_hos.htuesday} </span>
                </p>
                <p className={cx('day')}>
                    <span> 수  <span className={cx('pipe')}>  </span> </span>
                    <span> {this.state.current_hos.hwednesday} </span>
                </p>
                <p className={cx('day')}>
                    <span> 목   <span className={cx('pipe')}>  </span></span>
                    <span> {this.state.current_hos.hthursday} </span>
                </p>
                <p className={cx('day')}>
                    <span> 금   <span className={cx('pipe')}>  </span></span>
                    <span> {this.state.current_hos.hfriday} </span>
                </p>
                <p className={cx('day')}>
                    <span> 토  <span className={cx('pipe')}>  </span> </span>
                    <span> {this.state.current_hos.hsaturday} </span>
                </p>
                <p className={cx('day')}>
                    <span> 일  <span className={cx('pipe')}>  </span> </span>
                    <span> {this.state.current_hos.hsunday} </span>
                </p>
            </div>
        );
    }
    
    render() {
        console.log(this.props)
        if(!this.state.chk_fav) {
            if(this.props.userlike) {
                this.setFirstFav();
            }
            
        }
        if (!this.props.hosInfo) {
            this.props.setHosInfo(this.state.current_hos.hcode, this.state.current_hos.hname, this.state.current_hos.haddress);
            // console.log(this.props.hosInfo)
        }
        return (
            <div className={cx('container')}>
                <div className={cx('basic-box')}>
                    <ImageGallery
                        showNav={false}
                        showBullets={false}
                        showPlayButton={false}
                        disableArrowKeys={true}
                        showFullscreenButton={false}
                        items={this.state.image}
                    />
                </div>
                <div>
                    {this.setHos()}
                </div>
                <div className={cx('time-box')}>
                    <LittleMap
                        lat={this.state.current_hos.hlatitude}
                        long={this.state.current_hos.hlongitude}
                    />
                    {this.setRunningTime()}
                </div>
                <div className={cx('review-main')}>가격 정보</div>
                {this.setPrice()}
                <div className={cx('review-main')}>리뷰 정보</div>
                <div className={cx('grade-box')}>
                    <div className={cx('grade')}>
                        <HosGrades grade={this.state.grade} />
                    </div>
                    <div className={cx('grade-avg')}>
                        {this.setAverageGrade()}/5
                        <br />
                        <br />
                    </div>
                </div>
                
                <div className={cx('reviews')}>
                    {this.setReviewList()}
                    
                </div>

                <br />
                <br />

                <div className={cx('button-container')}>
                    <button className={cx('border-button')} onClick={() => this.handleOnclick()}>리뷰 작성하기</button>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        hosInfo: state.review.hosInfo,
        reviewData: state.review.hosReview,
        userData: state.user,
        photolist: state.hos.hosPhoto,
        userlike: state.user.likedHos,
        hos : state.hos,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      
        setHosInfo: (id, name, address) => dispatch(review.setHosInfo(id, name, address)),
        getHosPhoto: (photocode) => dispatch(hos.getHosPhoto(photocode)),
        getMyLikeHos: (u_id) => dispatch(user.getMyLikeHos(u_id)),
        getHosReview: (hcode, atoken) => dispatch(review.getHosReview(hcode, atoken)),
        likeHos: (hcode) => dispatch(hos.likeHos(hcode)),
        setPathName: (pathname) => dispatch(stat.setPathName(pathname)),
        getHosByCode: (hcode) => dispatch(hos.getHosByCode(hcode)),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HosDetail)

