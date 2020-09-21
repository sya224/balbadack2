const axios = require('axios')

const config = {
    headers: {
        Authorization: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwc2oiLCJpYXQiOjE1OTE1OTgwMjcsImV4cCI6MTU5MTU5OTgyN30.srmho3fudFAXymCiMa1wtEzUzz8PuxXj_b875nM1OLTXeXNd3aG3ELu1xle0ZbetNjNJwrsu0nZHNJCpmA0F5w"
    }
}

axios.post('http://localhost:7888/animal/mycompanion/all', config)
.then((res) => console.log(res))