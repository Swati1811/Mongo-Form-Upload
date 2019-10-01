const User=require('../model/userModel');
const express=require('express');
const router=express.Router();
const multer=require('multer');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g,'-')+file.originalname);
    }
});
const upload=multer({storage:storage,limits:{
    fileSize:1024*1024*5
 },
});

router.get('/',async(req,res)=>{
    const users=await User.find();
    res.send(users);
})

router.post('/',upload.single('profilePic'),async(req,res)=>{
    //console.log(req.file);
    let users=new User({
        "name":req.body.name,
        "age":req.body.age,
        "profilePic":req.file.path
    });

    users=await users.save();
    res.send(users);
})

module.exports=router;