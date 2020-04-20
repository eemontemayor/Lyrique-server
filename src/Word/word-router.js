'use strict';

const express = require('express');
const WordRouter= express.Router();
const axios = require('axios');
const config = require('../config')

WordRouter
   .get('/rhymes/:word', (req, res,next) => {


     const word = req.params.word

        
      return  axios({
            "method":"GET",
            "url":`https://wordsapiv1.p.rapidapi.com/words/${word}/rhymes`,
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key":`${config.API_KEY}`
            }
            })
            .then(words=>{


              res.status(200).json(words.data.rhymes)
            })
            .catch(next);


    })

// WordRouter
    

   
//     .get('/thesaurus/:word',(req, res) => {





//     })

//     WordRouter
   

   
//     .get('/syllables/:word', (req, res) => {

// axios({
//     "method":"GET",
//     "url":"https://wordsapiv1.p.rapidapi.com/words/incredible/syllables",
//     "headers":{
//     "content-type":"application/octet-stream",
//     "x-rapidapi-host":"wordsapiv1.p.rapidapi.com",
//     "x-rapidapi-key":"b5f70bd1c9msh133a4bbdfb3c433p1463c0jsn8429fb0c932c"
//     }
//     })
//     .then((response)=>{
//       console.log(response)
//     })
//     .catch((error)=>{
//       console.log(error)
//     })

// })

module.exports = WordRouter