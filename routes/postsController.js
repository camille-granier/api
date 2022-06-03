const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { PostsModel } = require('../models/postsModel');

//get data
router.get('/', (req, res) => {
    PostsModel.find((err, docs) => {
      if(!err) {
          res.send(docs)
      } else  {
          console.log('error to get data: ' + err)
      }
    })
})

//post
router.post('/', (req, res) => {
    const newRecord = new PostsModel({
        author: req.body.author,
        message: req.body.message
    })

    newRecord.save((err,docs) => {
        if(!err) res.send(docs);
        else console.log('error creating new data' + err);
    })
})

//update
router.put('/:id', (req, res) => {

})

module.exports = router;