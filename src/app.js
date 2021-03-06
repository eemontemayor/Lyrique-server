require('dotenv').config()
const express = require('express')
const redis = require("redis");
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const WordRouter = require('./Word/word-router')
const jsonBodyParser= express.json()
const port_redis =  6379;
const redis_client = redis.createClient(port_redis);



const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(jsonBodyParser)


app.use('/api/word', WordRouter)



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