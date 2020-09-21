import React, { Component } from "react";

import { connect } from "react-redux";
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind';

import HosReviewInfo from './HosReviewInfo';

const cx = classNames.bind(styles)

const reviewData = [
  {
    r_no: 0,
    u_id: 'aestas',
    r_nickname: '익명의 코끼리',
    r_photo: 'https://lh3.googleusercontent.com/proxy/QYikpOM5d8B4H0_YTn1sfYzEQcGYjKwUtseoQXBpXqhjh3bsn04ZdeNL533bsCyivn3OzERLxq2zBPl5l9rt_UU_B6PlMBkQHef624cQ8DI0TjJkozUb8Qyhs8kYkTGclUI-uGs83FjcgEo,http://www.busan.com/nas/wcms/wcms_data/photos/2020/02/12/2020021209194665170_l.jpg,https://modo-phinf.pstatic.net/20160629_37/1467141681611RHSrJ_JPEG/mosaazDVas.jpeg?type=w1100',
    r_content: '2010년부터 다니던 병원입니다. 고양이에게 중성화 수술은 꼭 필요한 것 같아요. 계속 힘들어해서 몇 차례 검진 받고 선생님과 상담후에 중성화 수술을 하게되었습니다. 선생님 정말 친절하시고요 여기 애견용 풀도 있는 것 같아서 상처 부위 치료되면 또 오려고요!',
    r_reciept: true,
    r_treatmentdata: '2020-05-10',
    r_date: '2020-05-10',
    tags: ['중성화수술', "고양이", "15kg",'정기적', "친절", "전용풀장", "감사"],
    r_overtreatement: 1,
    r_kindness: 4,
    r_result: 4,
    r_clean: 4,
    r_report: 0,
    r_deleted: false,
    Like: [{u_id:1}, {u_id:2}, {u_id:3}],
    careinfo: [
      {
        ci_no: 2,
        h_code: 1,
        ci_vet: '고양이',
        ci_price:25000,
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
        ci_price:30000,
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
        ci_price:50000,
        CareList: {
          c_code: 2,
          c_name: '마취약',
          c_category: '주사'
        },
        r_no: 0
      }
    ],
    h_code: 1
  },
  {
    r_no: 0,
    u_id: 'aestas',
    r_nickname: '다람쥐야',
    r_photo: 'https://lh3.googleusercontent.com/proxy/QYikpOM5d8B4H0_YTn1sfYzEQcGYjKwUtseoQXBpXqhjh3bsn04ZdeNL533bsCyivn3OzERLxq2zBPl5l9rt_UU_B6PlMBkQHef624cQ8DI0TjJkozUb8Qyhs8kYkTGclUI-uGs83FjcgEo,http://www.busan.com/nas/wcms/wcms_data/photos/2020/02/12/2020021209194665170_l.jpg,https://modo-phinf.pstatic.net/20160629_37/1467141681611RHSrJ_JPEG/mosaazDVas.jpeg?type=w1100',
    r_content: '햄스터를 키워 주변에 작은 동물을 봐 주는 곳이 없어 어쩔 수없이 여기까지 갑니다. 치료는 잘 하는데 너무 돈만 벌려고 이렇게 작은 햄스터를 수술을 하려고 하고 쓸데없는 걸 많이 하려 합니다. 그래서 아이가 괜찮아 지냐고 물어보면 그건 보장할 수 없다고 그때서야 그럼 하지 마세요 그런식 입니다.',
    r_reciept: true,
    r_treatmentdata: '2020-05-10',
    r_date: '2020-05-10',
    tags: ['진료', "햄스터", '친절'],
    r_overtreatement: 1,
    r_kindness: 4,
    r_result: 4,
    r_clean: 4,
    r_report: 0,
    r_deleted: false,
    Like: [{u_id:1}, {u_id:2}, {u_id:3}],
    careinfo: [
      {
        ci_no: 2,
        h_code: 1,
        ci_vet: '햄스터',
        ci_price:25000,
        CareList: {
          c_code: 3,
          c_name: '진료',
          c_category: '수술'
        },
        r_no: 0
      },
      {
        ci_no: 3,
        h_code: 1,
        ci_vet: '고양이',
        ci_price:30000,
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
        ci_price:50000,
        CareList: {
          c_code: 2,
          c_name: '마취약',
          c_category: '주사'
        },
        r_no: 0
      }
    ],
    h_code: 1
  },
]
  


class hosRevForDetail extends Component {
    componentDidMount() {
        this.state.cards = reviewData;
    }

    constructor(props) {
        super(props);
        this.state = {
            cards: [],
        };
    }

    onChange = chips => {

    };

    render() {
        this.state.cards = reviewData;
        let list, reviewCards;
        if (true) {
            list = this.props.location.state.localRev;
            console.log(list)
            reviewCards = list.map(r => <HosReviewInfo hospitalData={r} key={`newCard${r.hcode}`}/>)
          } else {
            return (
              reviewCards = null
            )
          }
          return (
            <div className={cx('container')}>
                <div className={cx('review-main')}>리뷰 모두 보기</div>
              {reviewCards}
            </div>
          )
    }
}



export default hosRevForDetail
