import React from "react";
import DatePicker from '../../components/DatePicker/DatePicker'
import GradeBox from '../../components/HosGrades/GradeBox'
import Pets from '@material-ui/icons/Pets'
import Add from '@material-ui/icons/Add'
import history from "../../history";
import AWS from 'aws-sdk'
import { connect } from 'react-redux'
import reviewFormer from './reviewFormer'
import { review } from '../../actions'
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      visitdate: new Date(),
      isphoto: false,
      purpose: '',
      photos: [],
      photoname: [],
      tempphotos: [],
      photoURL: [],
      selectedPhoto: null,
      content: "",
      tempClinic: [
        ['혈액검사-CBC', true, false],
        ['주사비-입원처치', true, false],
        ['심장사상충약 처방', false, true]
      ]
    }
  }


  handleText(e) {
    this.setState({ content: e.target.value })
  }

  async deletePhoto() {
    const pi = this.state.selectedPhoto
    await this.setState({
      selectedPhoto: null,
      photos: this.state.photos.filter((p, i) => i !== pi),
      photoname: this.state.photoname.filter((p, i) => i !== pi),
      tempphotos: this.state.tempphotos.filter((p, i) => i !== pi),
    })
    if (this.state.photos.length < 1) {
      await this.setState({ isphoto: false })
    }
  }

  async handleFiles(e) {
    const files = [...e.target.files]
    const names = files.map(f => f.name)
    const checked = names.filter(n => !(this.state.photoname.includes(n))).map((n, i) => files[i]).slice(0, 4)
    await this.setState({
      photos: this.state.photos.concat(...checked),
      photoname: this.state.photoname.concat(...names)
    })
    await this.setState({
      tempphotos: this.state.photos.map(f => URL.createObjectURL(f))
    })
    if (this.state.photos) {
      await this.setState({ isphoto: true })
    }
  }

  async submitPhotos() {
    const s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      params: {
        Bucket: process.env.BUCKET,
      },
      region: process.env.REGION,
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET
    });

    console.log('beforeSubmit')

    for await (const photo of this.state.photos) {
      const timeStamp = Math.floor(new Date().now / 1000)
      // uid로 바꾸기
      const params = {
        Key: 'sim_' + timeStamp + '.jpg',
        Body: photo,
        ACL: "private",
      };
      await this.setState({ photoURL: this.state.photoURL.concat('sim_' + timeStamp + '.jpg') })
      console.log('submitting')
      await s3.upload(params)
    }

    // // 영수증도 업로드하기
    // const params = {
    //   Key: 'sim_reciept_' + '.jpg',
    //   Body: this.props.reciept,
    //   ACL: "private",
    // };

    // await s3.upload(params).catch(err => console.log('영수증 업로드 중 에러가 발생했다냥', err))

    console.log('compoleteSubmit')
  }

  async submitForm() {
    const nullScore = this.props.scorelist.some(score => score === 0)

    const r = window.confirm('제출할거냥')
    if (r === false) {
      return
    }

    if (nullScore === true) {
      window.alert('병원 상세 평가를 먼저 완료해달라냥')
    }

    await this.submitPhotos()

    const data = {
      content: this.state.content,
      scorelist: this.props.scorelist,
      totalscore: this.props.totalscore,
      dojang: this.props.dojang,
      photos: this.state.photoURL,
      purpose: this.state.purpose,
      date: this.state.date
    }
    const carelist = [{
      animal: { acode: 1 },
      ciOpen: true,
      ciPrice: 1000,
      ciName: '혈액검사'
    }]
    const body = new reviewFormer(10, data, carelist, 'sim').getBody()
    console.log('body', body)
    await review.postReview(body)
    window.alert('후기 작성이 완료되었다냥')
    history.push('/')
  }

  async tableClick(i, ii) {
    let temp = this.state.tempClinic
    temp[i][ii] = !temp[i][ii]
    await this.setState({tempClinic: temp})
  }
  render() {
    const animal = ['dog']
    const animalsrc = animal.map(a => require(`../../assets/${a}.png`))
    const animalimg = animalsrc.map(url => { return <img key={url} src={url} alt={url} /> })



    const clinicRow = this.state.tempClinic.map((t, i) => {
      return <tr key={`${t}-${i}`}>
        {t.map((d, di) => 
          { return <td key={`${d}-${di}`} onClick={()=> this.tableClick(i, di)}>{d === true ? <Pets style={{ fontSize:17 }}/> : d}</td> })}
      </tr>
    })

    const reviewimg = this.state.tempphotos.map(
      (url, i) => {
        return <img
          className={cx(i === this.state.selectedPhoto ? 'selected-photo' : 'photo')} key={url} src={url} alt='사진후기'
          onClick={() => this.setState({ selectedPhoto: i })}
        />
      }
    )

    return (
      <div className={cx('temp-body')}>
        {/* <div className={cx('row')}>
            <div className={cx('small-category')}><p>방문 날짜</p></div>
            <div className={cx('spacer')}></div>
            <div className={cx('small-category')}><p>진료 대상</p></div>
          </div> */}
        {/* <div className={cx('row')}>
            <div className={cx('small-col')}>
              <DatePicker 
                value={this.state.visitdate}
              />
            </div>
            <div className={cx('spacer')}></div>
            <div className={cx('small-col','animal-box')}>
              {animalimg}
            </div>
          </div> */}
        <div className={cx('category')}>
          <p>병원 상세 평가</p>
        </div>
        <GradeBox />
        <div
          className={this.props.dojang ? cx('border-button', 'active') : cx('border-button')}
          onClick={() => this.props.doDojang(!this.props.dojang)}
        >
          <p>다시 방문할 의사 {this.props.dojang ? '없다옹' : '있다옹'}</p>
          <Pets style={{ fontSize: 15 }} />
        </div>
        
        <div className={cx('h-spacer')}></div>
        <div className={cx('big-divider')}></div>
        <div className={cx('h-spacer')}></div>
        
        <div className={cx('category')}>
          <p>진료 후기 상세</p>
        </div>
        <div className={cx('purpose-box')}>
          <input 
            type='text'
            placeholder={'방문목적을 작성해 주세요.'}
          />
        </div>
        <div className={cx('box')}>
          <textarea
            placeholder={'후기를 작성해 주세요.'}
            rows="3"
            value={this.state.content}
            onChange={this.handleText.bind(this)}
          />
        </div>
        <div
          className={
            this.state.isphoto
              ? cx('hide')
              : cx('border-button', 'upload-btn-wrapper')}
        >
          <p>사진 첨부하기<span>최대 3장</span></p>
          <input
            type="file"
            name="file"
            accept="image/*"
            multiple
            onChange={this.handleFiles.bind(this)}
          />
        </div>
        <div
          className={
            this.state.isphoto
              ? cx('photo-box')
              : cx('hide')
          }
        >
          {reviewimg}
        </div>
        <div
          className={cx(this.state.selectedPhoto === null ? 'hide' : 'border-button')}
          onClick={this.deletePhoto.bind(this)}
        >
          <p>선택한 사진 삭제하기</p>
        </div>
        <div
          className={
            this.state.isphoto && (this.state.photos.length < 3)
              ? cx('border-button', 'upload-btn-wrapper')
              : cx('hide')}
        >
          <p>사진 추가하기<span>최대 3장</span></p>
          <input
            type="file"
            name="file"
            accept="image/*"
            multiple
            onChange={this.handleFiles.bind(this)}
          />
        </div>
        
        <div className={cx('h-spacer')}></div>
        <div className={cx('big-divider')}></div>
        <div className={cx('h-spacer')}></div>

        <div className={cx('category')}><p>진료 대상과 항목</p></div>
        <div className={cx('animal-box')}>
          {animalimg}
          <div className={cx('plus-icon')}><Add/></div>
        </div>
        <div>
          <table className={cx('clinic-table')}>
            <thead>
              <tr><th>진료항목</th><th>대상</th><th>숨김</th></tr>
            </thead>
            <tbody>{clinicRow}</tbody>
          </table>
        </div>
        <div className={this.props.scorelist.some(score => score === 0) ? cx('hide') : cx('bottom-space')}></div>
        <div
          className={this.props.scorelist.some(score => score === 0) ? cx('hide') : cx('submit-btn', 'clicked')}
          onClick={this.submitForm.bind(this)}
        >
          <p>제출하기</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dojang: state.review.dojang,
    scorelist: state.review.scorelist,
    totalscore: state.review.totalscore,
    status: state.status,
    hosInfo: state.review.hosInfo,
    reciept: state.review.reciept
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    doDojang: (revisit) => dispatch(review.doDojang(revisit)),
    postReview: (body) => dispatch(review.postReview(body)),

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewForm)