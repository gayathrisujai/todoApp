const express=require('express');
const router = new express.Router();
const jwt=require('jsonwebtoken')
const todoModel = require('../models/todoData');
router.use(express.json());
router.use(express.urlencoded({extended:true}));

function verifyToken(req,res,next){
    let token=req.headers.token;
    try {
        if(!token) throw 'Unauthorised Access'
        let payload=jwt.verify(token,"secret")
        if (!payload) throw 'Unauthorised Access'
        next()

    } catch (error) {
        res.json({message:error})
    }
}

router.get('/', verifyToken,async (req, res) => {
    try {
        const data = await todoModel.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send('Data not found');
    }

})

router.post('/addnew',verifyToken,async (req,res)=>{
    try {
        const data = await todoModel.create(req.body);

        res.status(200).send('Post successful');


    } catch (error) {
        res.status(400).send('Post Unsuccessful');
    }
});

router.put('/edit/:id',verifyToken,async(req,res)=>{
    try {
        const id=req.params.id;
        const data=await todoModel.findByIdAndUpdate(id,req.body);
        res.status(200).send('Update successful');

    } catch (error) {
        res.status(404).send('Update unsuccessful');

    }
});



router.delete('/delete/:id',verifyToken,async(req,res)=>{
    try {
        const id=req.params.id;
        const data=await todoModel.findByIdAndDelete(id,req.body);
        res.status(200).send('delete successful');

    } catch (error) {
        res.status(404).send('delete unsuccessful');

    }
});




module.exports=router;