const axios = require('axios')

const config = {
    headers: {
        Authorization: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwc2oiLCJpYXQiOjE1OTE1OTg3NDksImV4cCI6MTU5MTYwMDU0OX0.dc0u6GS8LsJ5luDd0G6Syn1jjWW0s9SrwOQPgrCI0ByX092sD0ng76u5Sv6XTwPYoCNYpC36NS2Bgr5bpxyI-g"
        ,'Content-Type':'application/json'
    }
}

axios.post('http://k02a3051.p.ssafy.io:7888/animal/mycompanion/all', null, config)
.then((res) => console.log(res))
.catch(err => console.log(err))