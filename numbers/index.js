const axios = require('axios');
const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.send("hello")
    axios.get("http://104.211.219.98/numbers/primes")
    .then((response) => {
        console.log(response.data)
    })
})

app.get('/numbers', async (req, res) => {
    gotSoFar = []

    urls = req.query
    await urls.url.forEach(url => {
        axios.get(url)
        .then(function (response) {
            console.log(gotSoFar)
            gotSoFar += response.data.numbers
        })
        .catch(function (e) {
            console.log("error")
        })
    })
    console.log(gotSoFar)
    gotSoFar = mergeSort(gotSoFar)
    console.log(gotSoFar)
    removeDoops(gotSoFar)
    console.log(gotSoFar)
    res.send(gotSoFar)
})

function mergeSort(gotSoFar) {
    // Base Case
    if(gotSoFar.length <= 1) return gotSoFar

    let mid = Math.floor(gotSoFar.length / 2 )

    // Divide and Conquer
    let left = mergeSort(gotSoFar.slice(0, mid))
    let right = mergeSort(gotSoFar.slice(mid))

    return merge(left, right)
}

function merge(left, right) {
    let sortedArr = [] 

    while (left.length && right.length) {

        // Add the smallest element 
        if (left[0] < right[0]) {
            sortedArr.push(left.shift())
        } else {
            sortedArr.push(right.shift())
        }
    }
    return [...sortedArr, ...left, ...right]
}

function removeDoops(gotSoFar) {
    filteredNums = []
    filteredIdx = 0

    for (let i = 0; i < gotSoFar.length - 1; i++) {
        const element = gotSoFar[i];

        if(filteredIdx == 0) filteredNums.push(element);

        else if(filteredNums[filteredIdx] != element) {
            filteredNums.push(element)
            filteredIdx++;
        }
    }
    gotSoFar = filteredNums
}

app.listen(port, () => {
    console.log(`Listening ${port}`)
})

