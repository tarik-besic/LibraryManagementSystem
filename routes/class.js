const express=require('express')
const router=express.Router()
const multer = require('multer')
const XLSX = require("xlsx")
const {read}=require('./user');
const User=require('../models/user')

//controller
const {addClass}=require("../controllers/addClassController");

const storage = multer.diskStorage({ //telling multer where to store the Excel file
     
    destination: function (req, file, cb) {
    
         cb(null, "public");
          
    },
    filename: function (req, file, cb) {
        const parts = file.originalname.split(".");
        let extension=parts.pop()
        if(extension=='xlsx'||extension=='xls'||extension=='ods')  //file will only be added to public if its correct extension
        
        cb(null, `uploadedFile.xlsx`) //file name will always be static uploadedFile.xlsx
        else 
        console.log("WRONG FILE UPLOADED")
    }
})

const upload = multer({
    storage
});

router.get("/",(req,res)=>{
    arrayOfUsers=read()
    res.render('createClass',{arrayOfUsers})

})

router.post("/upload", upload.single("upload"), (req, res) => {
    
    arrayOfUsers=read()
    res.render('createClass',{arrayOfUsers});

})

router.post("/users",addClass);

module.exports=router