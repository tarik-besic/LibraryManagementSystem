const { Router } = require('express')
const express=require('express')
const router=express.Router()
const multer = require('multer')
const XLSX = require("xlsx")
const {read}=require('./user');
const User=require('../models/user')

const storage = multer.diskStorage({ //telling multer where to store the Excel file
     
    destination: function (req, file, cb) {
    
         cb(null, "public");
          
    },
    filename: function (req, file, cb) {
        const parts = file.originalname.split(".");
        let first=parts.pop()
        if(first=='xlsx'||first=='xls'||first=='ods')  //file will only be added to public if its correct extension
        
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

router.post("/users",async (req, res) => {
     
    let arr=req.body;
    let itUsers=[],hairUsers=[],basicUsers=[];
    let adddata=true;
    let counter=0; //defining counter
  // array of arrays, thats why I'm using double forEach
   arr.forEach(element => {
    counter++;
    element.forEach(user => {
       
        user.name=user.name.trim();
         let email=false       //bool variable to check if email is correct
        
        
        //removing additional spaces before and after first name and last name;
         let array=user.name.split(" "); //spliting first and last name
         
     
       //removing all unnecessary spaces
          let firstname=array.shift();
          let lastname=array.pop();
         firstname=firstname.trim();

         if(typeof lastname!=='undefined')
         {  
         
         lastname=lastname.trim();
        
        }
         else {
        lastname="NOLASTNAME"
        adddata=false;
        }
                 
        if(user.email.includes("@"))
        {
            email=true;

        }
        else
        {email=false;} //if client forgot email then variable email is false
        
        
        //if the user didn't input first and last name and if he messed up email then its error
        if(firstname==="undefined"||lastname==="undefined"|| email==false)
        {
            adddata=false
        } 
         else 
         {
             firstname=firstname.toLowerCase();
             lastname=lastname.toLowerCase();
            user.name=firstname+ ' '+ lastname;
        }
        
    });
    //spliting each user into specific array and then insterting them into database
    //also adding them class

    //SHOULD UPDATE CLASSES FRIST HERE
    let user={};
    
    switch (counter) {
        case 1:
            element.forEach(x => { //saving each user into database
                    user_database=new User({
                    name:x.name,
                    email:x.email,
                    class:"1-a",
                    books:[]
                })
               user_database.save().then(()=>console.log("IT UserSaved"));
            });
            break;  
        case 2:
            element.forEach(x => {
                    user_database=new User({
                    name:x.name,
                    email:x.email,
                    class:"1-b",
                    books:[]
                })
                user_database.save().then(()=>console.log("Basic UserSaved"));
            });
            break;
        case 3:
            element.forEach(x => {
                    user_database=new User({
                    name:x.name,
                    email:x.email,
                    class:"1-c",
                    books:[]
                })
                user_database.save().then(()=>console.log("Hair UserSaved"));
            });
            break;
    }
        //first gotta update all classes
        
        //user_database.findById({name{}})
        
      
        
      
   });
  


//TESTIRAM KAKO DA UPDATEAM SVE RAZREDE NAKON STO NAPRAVIS NOVI RAZRED (MORAT CU I IZBRISAT SVE cetvrte razrede sa obzirom da se ovo radi na kraju godine.)
//ali imaj na umu da prvo sacuvas koliko je knjiga rentano za history stats class

//let tare=await User.find({name:"Tarik Besic"},{$set: {class:'2-a'},function(err,model){if(err)console.log("ERROR"); else console.log(model)}});   


if(adddata)
res.status(200).render("index")
else if(adddata==false)
res.status(401).render("index");

})



module.exports=router