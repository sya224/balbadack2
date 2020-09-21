export default class reviewFormer {
  constructor(hcode, data, carelist, uid) {
    this.review = {
      hospital: {
        hcode: hcode
      },
      rcontent: data.content,
      rdeleted: false,
      rclean: data.scorelist[0],
      rkindness: data.scorelist[1],
      rresult: data.scorelist[2],
      rprofessionality: data.scorelist[3],
      rovertreatment: data.scorelist[4],
      rstarrating: data.totalscore,
      rrevisit: data.dojang,
      rphoto1: data.photos.length > 0 ? data.photos[0] : '',
      rphoto2: data.photos.length > 1 ? data.photos[1] : '',
      rphoto3: data.photos.length > 2 ? data.photos[2] : '',
      rpurpose: data.purpose,
      rreceipt: true,
      rreport: 0,
      rdate: new Date(),
      rtreatmentdate: data.date,
      user: {
        uid: uid
      }
    }
    this.careinfo = carelist.map(c => ({
      animal: {acode: c.acode},
      ciOpen: c.ciOpen,
      ciPrice: c.ciPrice,
      ciName: c.ciName,
      hospital: {hcode: hcode}
    })) 
  }
  getBody() {
    const body = {
      careinfo: this.careinfo,
      review: this.review
    }
    return body
  }
}