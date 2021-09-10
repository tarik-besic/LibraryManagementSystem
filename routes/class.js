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
async function checkEmail(){
    let allUsers=[],rejectedUsers=[]; 
    try {
    
    for (let i = 0; i < arr.length; i++) { 
               
      for (let j = 0; j < arr[i].length; j++) {
       const user = arr[i][j];
       
         let data=await User.findOne({email:user.email})
         if(data){
             rejectedUsers.push(user);
            //  console.log("Naso sam korisnika:"+data+"... sad dodajem korisnika ovog:"+user.email) 
            }
         else allUsers.push(user);  
    }

}}
    catch (error) {
        console.log(error);
    }
//     console.log("Na kraju funkcije finnally...");
//    console.log("Odbijeni korisnici su:"+rejectedUsers[0].name);
//    console.log("Prihvaceni korisnici su:"+allUsers[0].name);

return [rejectedUsers,allUsers];
}

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
    let emailResult;
    let rejectedUsers=[],allUsers=[];

  // array of arrays, thats why I'm using double forEach
   
  for (let i = 0; i < arr.length; i++) {
      for (let k = 0; k < arr[i].length; k++) {
          const user = arr[i][k];
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
        {email=false;
        res.status(401)} //if client forgot email then variable email is false        
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

        switch (i) {
            case 0:
                user.class="1-a";
              break;
            case 1:
                user.class="1-b";
                break;
            case 2:
                user.class="1-c";
                break;
      }
      //should update classes first 
      //first checking email if it exists
      //TESTIRAM KAKO DA UPDATEAM SVE RAZREDE NAKON STO NAPRAVIS NOVI RAZRED (MORAT CU I IZBRISAT SVE cetvrte razrede sa obzirom da se ovo radi na kraju godine.)
//ali imaj na umu da prvo sacuvas koliko je knjiga rentano za history stats class

      let data=await User.findOne({email:user.email})
      if(data){
          rejectedUsers.push(user); //adding user which has its email already in database rejectedUsers
         }
      else allUsers.push(user);  //else user is not found in database and just adding him to allUsers..
    }}


if(adddata)
{try {
    if(rejectedUsers.length==0)
    {
        await User.insertMany(allUsers)
        res.status(200)
    }
    else{
    console.log("ODBIJENI KORISNICI KOJI VEC POSTOJE U BAZI PODATAKA SU:")
    console.log(rejectedUsers);
    res.status(400).json(rejectedUsers);
}

} catch (error) {
    console.log(error)
}}
else if(!adddata)
res.status(401)


  
})
module.exports=router