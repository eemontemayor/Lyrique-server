"use strict";

const express = require("express");
const WordRouter = express.Router();
const axios = require("axios");
const config = require("../config");
const { groupBySyllCount, quickSort } = require("./word-list-service");
const redis = require("redis");
const port_redis = 6379;
const redis_client = redis.createClient(port_redis);


//Middleware Function to Check Cache
const checkCache = (req, res, next) => {
  const  word  = req.params.word;

  redis_client.get(word, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    //if no match found
    if (data != null) {
      res.send(data);
    } else {
      //proceed to next middleware function
      next();
    }
  });
};




//  Endpoint:  GET /rhymes/:word
//  @desc Return 3 nested arrays from datamuse api
WordRouter
.get("/rhymes/:word", checkCache, async (req, res, next) => {
 try{

   
   const word = req.params.word;
   
   
   const rhymes = await axios({
     method: "GET",
     url: `https://api.datamuse.com/words?rel_rhy=${word}&md=drp&max=300`,
    })

  
      redis_client.setex(word, 3600, JSON.stringify(rhymes.data));
      const result = groupBySyllCount(rhymes.data)
      console.log(rhymes.data)
   

      res.status(200).json(result);
   

  }catch(error){
    console.log(error);
    return res.status(500).json(error);

  }
});



WordRouter.get("/synonyms/:word", (req, res, next) => {
  const word = req.params.word;
 

  return axios({
    method: "GET",
    url: `https://api.datamuse.com/words?rel_syn=${word}&md=drp&max=200`,
  })
    .then((words) => {
      const sortedList = quickSort(words.data);

      console.log(sortedList)
      // console.log('sortedList', sortedList)
      const result = groupBySyllCount(sortedList)
  

      res.status(200).json(result);
    })
    .catch(next);
});


WordRouter.get("/alliterations/:word", (req, res, next) => {
  const word = req.params.word;
 

  return axios({
    method: "GET",
    url: `https://api.datamuse.com/words?rel_cns=${word}&md=drp&max=200`,
  })
    .then((words) => {
      const sortedList = quickSort(words.data);

      console.log(sortedList)
      // console.log('sortedList', sortedList)
      const result = groupBySyllCount(sortedList)
  

      res.status(200).json(result);
    })
    .catch(next);
});



WordRouter.get("/data/:word", async (req, res, next) => {
 
  try{



  const word = req.params.word;
 

  const wordInfo = await axios({
    method: "GET",
    url: `https://api.datamuse.com/words?sp=${word}&md=drp`,
  })
  // redis_client.setex(word, 3600, JSON.stringify(wordInfo.data));


  res.status(200).json(wordInfo.data);


  }
  catch(error){
    console.log(error);
    return res.status(500).json(error);

  }

});



module.exports = WordRouter;
