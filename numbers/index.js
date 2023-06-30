const axios = require('axios');
const http = require('http')
const express = require('express')
const app = express()
const port = 3000

gotSoFar = []

app.get('/', (req, res) => {
    res.send("hello")
    axios.get("http://104.211.219.98/numbers/primes")
    .then((response) => {
        console.log(response)
    })
})

app.get('/numbers', async (req, res) => {
    urls = req.query
    await urls.url.forEach(url => {
        axios.get(url)
        .then(function (response) {
            gotSoFar += response.data.numbers
            console.log(gotSoFar)
        })
    })
    
    console.log(gotSoFar)
    res.send(gotSoFar)
})

app.listen(port, () => {
    console.log(`Listening ${port}`)
})

