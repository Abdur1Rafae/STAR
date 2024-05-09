const express = require('express')
const router = express.Router()
const upload = require('../util/upload')
const remove = require('../util/remove')

router.post("/", upload.single("image"), (req, res) => 
{
    try{
        const oldUrl = req.body.oldUrl
        if(oldUrl){remove(oldUrl)}
        if (req.file) {res.status(201).send({url: req.file.path})} 
        else {res.status(400).send({error: 'ER_VALIDATION' , message: "Please upload a valid image"})}
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to upload image'})
    }
})

  module.exports = router