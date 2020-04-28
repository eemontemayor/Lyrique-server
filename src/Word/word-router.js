"use strict";

const express = require("express");
const WordRouter = express.Router();
const axios = require("axios");
const config = require("../config");
const { groupBySyllCount, quickSort } = require("./word-list-service");



WordRouter.get("/rhymes/:word", (req, res, next) => {
  const word = req.params.word;
 

  return axios({
    method: "GET",
    url: `https://api.datamuse.com/words?rel_rhy=${word}&md=drp&max=300`,
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



WordRouter.get("/synonyms/:word", (req, res, next) => {
  const word = req.params.word;
 

  return axios({
    method: "GET",
    url: `https://api.datamuse.com/words?rel_syn=${word}&md=drp&max=20`,
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
 
  

  const word = req.params.word;
 

  return axios({
    method: "GET",
    url: `https://api.datamuse.com/words?sp=${word}&md=drp`,
  })
    .then((words) => {
      res.status(200).json(words.data);
    })
    .catch(next);



});



module.exports = WordRouter;
