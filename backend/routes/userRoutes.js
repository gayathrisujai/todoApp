const express=require('express');
const router = new express.Router();
const jwt=require('jsonwebtoken')
require("../db/connection")
const userModel=require('../models/user');
router.use(express.json());
router.use(express.urlencoded({extended:true}));


router.post('/login',async(req,res)=>{
    const user=await userModel.findOne ({username:req.body.username})
    if (!user) {
        res.json({message:"user not found"})
    }
    try{
        if (user.password==req.body.password) {
            const payload={uname:req.body.username,pwd:req.body.password};
            const token=jwt.sign(payload,"secret")
            res.status(200).send({message:"Successfully logged in",usertoken:token})
        }
    }catch(error){
        console.log(error);
    }
})
module.exports=router