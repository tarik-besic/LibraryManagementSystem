const express=require('express')
const userRouter=express.Router()
const fs=require('fs')
const XLSX = require("xlsx")
const User=require('../models/user')
const morgan=require('morgan');

userRouter.get('/', (req, res) => {

    res.render('users');

})
userRouter.use(morgan('dev'))
userRouter.patch('/', async(req, res) => {
    let result;
    let name=req.query.name;
    let email=req.query.email;
    let schoolclass=req.query.class;
    let books=req.query.book;
    console.log(name+email+schoolclass+books)
    if(name&&email&&schoolclass&&books)
    {   try {
        result=await User.findOneAndUpdate({$and:[{name:name},{email:email},{class:schoolclass}]},{$push:{books:books}})
    } catch (error) {
        res.send(error)
    }
    finally{
        res.send(result);
    }
        
    }

})

userRouter.get('/getusers/', async(req, res) => {

  //@getting params from frontend

 let name=req.query.name;
 let book=req.query.book;
 let schoolClass=req.query.class;
 let result;

 //checking which params are sent by user...
 //I made a jqeury function that doesnt send empty params rather only the ones with string. Location of function:(public/javascript/jqeury.js --on the bottom of file)
  if(name)  //checking if name is defined
  name=name.toLowerCase();
  
  if(book)book=book.toLowerCase();

  if(!schoolClass) schoolClass="/"; //setting it to something unusual so search results will be 0 if the name or book or class is not sent by a client.   
  
  if(!name) name='/';   

  if(!book)book='/';
 

  if(name=='/'&&book=='/'&&schoolClass=='/')  //if 0 params are sent by user..we just get all users from database
 {    console.log("UNUTRA")
     try {
      result=await User.find({})   //getting all users from database
  } catch (error) {
      res.send(error)
  }finally{
      res.send(result)
  }
}
  else
{  try {
      result=await User.find({$or:[{name:{$regex:name}},{class:{$regex:schoolClass}},{books:{$all:[book]}}]}) //searhcing for user in database that has either contains name,class or book 
  } catch (err) {
      console.log(err)
  }    
  finally{       
      res.send(result)
  }}
  
})

userRouter.post('/',async(req,res)=>{

    let name=req.body.name;
    let email=req.body.email;
    let schoolclass=req.body.class;
    let books=req.body.books

    // if(name)name=name.toLowerCase();
    // if(email)email=email.toLowerCase();
    // if(schoolclass)schoolclass=schoolclass.toLowerCase();
   
    console.log(name+email+schoolclass+books)
    let user_database=new User({
        name:name,
        email:email,
        class:schoolclass,
        books:books
    })

    //User.findByIdAndUpdate({name:name,})


    let result;
    try {
        result=await user_database.save()
    } catch (error) {
        console.log(error)
    }
    finally{
        res.send(result)
    }
});


//function that reads names from either uploaded or empty Excel file that are inside public folder..
function read() 
{
    let readThisFile;
    //chekcing if file excists so server can read it.
    const path=(fs.existsSync("./public/uploadedFile.xlsx"))? readThisFile='./public/uploadedFile.xlsx' : readThisFile='./public/emptyFile.xlsx'
    const workbook = XLSX.readFile(readThisFile)
    
    
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];

    let itUsers = []
    let basicUsers = []
    let hairUsers = []
    let user = {}

    let classwork=0;  //variable for determaning to which array to push users to...eg classwork=0 means itUsers.push(user)...classwork=1 means basicUsers.push(user)
    for (cell in worksheet) {
        const cellAsString = cell.toString();
        //if(cellAsString[1]=='1') continue
        if (cellAsString[0] === 'A') {
            
            if(worksheet[cell].v=="ime")continue;
            if(worksheet[cell].v=="Opca gimnazija") classwork=1;
            if(worksheet[cell].v=="frizer") classwork=2;
            user.name = worksheet[cell].v
        }
        if (cellAsString[0] === 'B') {
            
            if(worksheet[cell].v=="email")continue;
            user.email = worksheet[cell].v
            switch (classwork) {
                case 0:itUsers.push(user); break;

                case 1:basicUsers.push(user); break;
                
                case 2:hairUsers.push(user); break;
            }
            
            user = {}
        }
    }

    return [itUsers,basicUsers,hairUsers]
}

module.exports={userRouter,read}  //exporint read function aswell because it is used aswell in /routes/class.js
