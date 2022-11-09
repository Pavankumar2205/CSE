const router = require('express').Router()
const joi = require('joi')
const Schema = require('../models/p_schema')

const verify = require('./user_verification')

const pcheck = joi.object({
    pname : joi.string().required(),
    pcost : joi.number().required(),
    pcolor: joi.string().required(),
    pdesc: joi.string()
})

router.post('/add',verify, async (req,res)=>{

    const {error} = pcheck.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message) 

    const post = new Schema({
        pname: req.body.pname,
        pcost : req.body.pcost,
        pcolor : req.body.pcolor,
        pdesc : req.body.pdesc
    })

    try {
        await post.save()
        res.send("Posted Successfully")
    } catch (error) {
        res.send(err.message)
    }

})

router.get('/get', async (req,res)=>{
    try {
        const posts = await Schema.find()
        res.status(200).send(posts)
    } catch (error) {
        res.send(err.message)
    }
})

router.patch('/:id',verify, async (req,res)=>{
    try{
    const post = await Schema.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.send(post)
    }
    catch(err){
        res.send(err.message)
    }
})

router.delete('/:id',verify,async (req,res)=>{
    const post = await Schema.remove({_id:req.params.id})
    res.send(post)
})
module.exports = router