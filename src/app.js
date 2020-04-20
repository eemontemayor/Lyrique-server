require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const WordRouter = require('./Word/word-router')
const jsonBodyParser= express.json()
const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(jsonBodyParser)


app.use('/api/word', WordRouter)

app.get('/api/rhymes/:word', (req, res, next) => {

  console.log('get rhymes')
  const word = req.params.word

     
     axios({
         "method":"GET",
         "url":`https://wordsapiv1.p.rapidapi.com/words/%7B${word}%7D/rhymes`,
         "headers":{
         "content-type":"application/octet-stream",
         "x-rapidapi-host":"wordsapiv1.p.rapidapi.com",
         "x-rapidapi-key":`${config.API_KEY}`
         }
         })
         .then((words)=>{
          res.status(200).json(words)
         })
         .catch(next);


 })

 app.use(function errorHandler(error, req, res, next) {
   let response
   if (NODE_ENV === 'production') {
     response = { error: { message: 'server error' } }
   } else {
     console.error(error)
     response = { message: error.message, error }
   }
   res.status(500).json(response)
 })
     

module.exports = app