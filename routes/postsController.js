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
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id)

    const updateRecord = {
        author: req.body.author,
        message: req.body.message
    }

    PostsModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateRecord },
        { new: true },
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("Update error: " + err)
        }
    )
})

router.delete('/:id', (req, res) =>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id)

    PostsModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("Delete error: " + err)
        }
    )
})

module.exports = router;