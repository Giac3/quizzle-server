const express = require('express')
const cors = require('cors')
const app = express()
const fetch = require('node-fetch')

const PORT = process.env.PORT || 3333
app.use(cors())

let time = 0;

let question = {};

const getQuestion = () => {
    setTimeout(() => {
        fetch('https://the-trivia-api.com/api/questions?limit=1').then((res) => {
            res.json().then((data) => {
                
                question = data
                
                getQuestion()
            })
            
        })
        
    }, 30000);
    
}
getQuestion()


const timer = () => {
    if (time === 30) {
        time = 0
    }
    setTimeout(() => {
        time+=1
        timer()
    }, 1000);
}

timer()

app.get("/api", (req,res) => {
    res.status(200).json({
        time: time,
        question: question
    })
})

app.listen(PORT, () => console.log(`running on ${PORT}`))
