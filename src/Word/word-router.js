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
            "url":`https://api.datamuse.com/words?rel_rhy=${word}`,
        
            })
      .then(words=>{
     
                res.status(200).json(words.data)
              })
              .catch(next);
      // return  axios({
      //       "method":"GET",
      //       "url":`https://wordsapiv1.p.rapidapi.com/words/${word}/rhymes`,
      //       "headers":{
      //       "content-type":"application/octet-stream",
      //       "x-rapidapi-host":"wordsapiv1.p.rapidapi.com",
      //       "x-rapidapi-key":`${config.API_KEY}`
      //       }
      //       })
      //       .then(words=>{
      //         res.status(200).json(words.data.rhymes)
      //       })
      //       .catch(next);


    })

    WordRouter
    .get('/similairPhrases/:phrase', (req, res,next) => {
 
 
      const wordArr = req.params.phrase.split('+')


  

      return  axios({
             "method":"GET",
             "url":`https://api.datamuse.com/words?ml=${wordArr}`,
         
             })
       .then(phrases=>{
        console.log(phrases.data)
                //  res.status(200).json(words.data)
               })
               .catch(next);
              })


              WordRouter

    WordRouter
    .get('/homophones/:word', (req, res,next) => {
 
 
      const word = req.params.word

      return  axios({
             "method":"GET",
             "url":`https://api.datamuse.com/words?sl=${word}`,
         
             })
       .then(words=>{
        console.log(words.data)
                //  res.status(200).json(words.data)
               })
               .catch(next);
              })
              WordRouter
              .get('/alliterations/:word', (req, res,next) => {
           
           
                const word = req.params.word
          
                const firstLetter = word.split('')[0]
           console.log(firstLetter)
                return  axios({
                       "method":"GET",
                       "url":`https://api.datamuse.com/words?ml=${word}&sp=${firstLetter}*`,
                   
                       })
                 .then(words=>{
                  console.log(words)
                          //  res.status(200).json(words.data)
                         })
                         .catch(next);
                        })

    WordRouter
    .get('/synonyms/:word', (req, res, next) => {
      const word = req.params.word

     
       
      return axios({
    "method":"GET",
    "url":`https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`,
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"wordsapiv1.p.rapidapi.com",
    "x-rapidapi-key":`${config.API_KEY}`
    }
    })
    .then(word=>{
     
      res.status(200).json(word.data.synonyms)
    })
    .catch(next);

})

    WordRouter
    .get('/wordData/:word',  (req, res, next) => {
      const word = req.params.word

       
       
      const syll =  axios({
    "method":"GET",
    "url":`https://wordsapiv1.p.rapidapi.com/words/${word}/syllables`,
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"wordsapiv1.p.rapidapi.com",
    "x-rapidapi-key":`${config.API_KEY}`
    }
    })
    .then(word=>{
      // console.log(word.data.syllables)
      return word.data.syllables
    })
    .catch(next);


return syll


})

WordRouter
.get('/definition/:word', (req, res, next) => {
  const word = req.params.word

    console.log('from sylll')
   
  return axios({
"method":"GET",
"url":`https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`,
"headers":{
"content-type":"application/octet-stream",
"x-rapidapi-host":"wordsapiv1.p.rapidapi.com",
"x-rapidapi-key":`${config.API_KEY}`
}
})
.then(word=>{
  // console.log(word.data.syllables)
  res.status(200).json(word.data.definitions)
})
.catch(next);

})

module.exports = WordRouter