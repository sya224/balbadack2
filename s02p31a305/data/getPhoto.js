const axios = require('axios')
const fs = require('fs')

const APIKEY = "your api key"

const basicURL = "https://maps.googleapis.com/maps/api/place/photo?"
const key = `&key=${APIKEY}`


// function timeout(ms) {
//   console.log('sleep')
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

async function getPhoto(photoCode, width) {
  const photo = `&photoreference=${photoCode}`
  const url = basicURL+`maxwidth=${width}`+photo+key
  const r = await axios.get(url).catch((err) => console.log('caught it:', err))
  const photoURL = r.request.res.responseUrl
  return photoURL
}

async function writeList() {
  for await (let data of list) {
    const dataArray = data.split("|")
    const hos = dataArray[0]
    const photo = dataArray[1]
    let width, photoURL
    if (dataArray[3] < 600) {
      width = dataArray[3]
      photoURL = await getPhoto(photo, width).catch((err) => console.log('photo:', err))
    } else {
      width = 600
      photoURL = await getPhoto(photo, 600).catch((err) => console.log('photo:', err))
    }
    const result = [hos, photoURL, width]
    const txt = result.join('|') + '\n'
    fs.writeFileSync('photoUrl.txt', txt, {encoding:'utf8', flag:'a'})
    
    const thumbnailURL = await getPhoto(photo, 150).catch((err) => console.log('photo:', err))
    const thumbResult = [hos, thumbnailURL, 150]
    const thumbtxt = thumbResult.join('|') + '\n'
    fs.writeFileSync('photoUrl.txt', thumbtxt, {encoding:'utf8', flag:'a'})
    // await timeout(1000)
  }
}

const raw = fs.readFileSync('photo.txt', {encoding:'utf8', flag:'r'})
const list = raw.split(/\r?\n/)

writeList()
