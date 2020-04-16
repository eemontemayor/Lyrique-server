const express = require('express');
const WordRouter= express.Router();
const axios = require('axios');
WordRouter
    .route('/rhymes/:word')

    .get((req, res, next) => {


     const {word} = req.params

        
        axios({
            "method":"GET",
            "url":"https://wordsapiv1.p.rapidapi.com/words/%7Bword%7D/rhymes",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key":"b5f70bd1c9msh133a4bbdfb3c433p1463c0jsn8429fb0c932c"
            }
            })
            .then((response)=>{
            return res.status(200).json()
            })
            .catch((error)=>{
            console.log(error)
            })


    })

WordRouter
    .route('./thesaurus')

   
    .get((req, res, next) => {





    })

    WordRouter
    .route('./syllables')

   
    .get((req, res, next) => {

axios({
    "method":"GET",
    "url":"https://wordsapiv1.p.rapidapi.com/words/incredible/syllables",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"wordsapiv1.p.rapidapi.com",
    "x-rapidapi-key":"b5f70bd1c9msh133a4bbdfb3c433p1463c0jsn8429fb0c932c"
    }
    })
    .then((response)=>{
      console.log(response)
    })
    .catch((error)=>{
      console.log(error)
    })

}