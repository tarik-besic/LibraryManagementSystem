const express=require('express')
const userRouter=express.Router()
const fs=require('fs')
const XLSX = require("xlsx")
const path=require('path')

const userController=require('../controllers/userController')

userRouter.get('/', (req, res) => {
    
    res.render('users');
    
})

userRouter.post('/',userController.user_create_one);

userRouter.patch('/', userController.user_update_book);

userRouter.get('/getusers/',userController.user_getusers);

  
//function that reads names from either uploaded or empty Excel file that are inside public folder..
function read() 
{


   let filepath='./public/uploadedFile.xlsx'
  
    
    //chekcing if file excists so server can read it.
    const readThisFile=(fs.existsSync(filepath))? filepath : filepath='./public/emptyFile.xlsx'
  

    const workbook = XLSX.readFile(readThisFile)
    
    
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    let itUsers = []
    let basicUsers = []
    let hairUsers = []
    let user = {}

    let firstname,lastname;
    let classwork=0;  //variable for determaning to which array to push users to...eg classwork=0 means itUsers.push(user)...classwork=1 means basicUsers.push(user)
    for (cell in worksheet) {
        
        const cellAsString = cell.toString();
        //if(cellAsString[1]=='1') continue

        
        if(worksheet[cell].v=="ime")continue;
        if(worksheet[cell].v=="Informaticka gimnazija") {classwork=0;continue;}
        if(worksheet[cell].v=="Opca gimnazija") {classwork=1;continue;}
        if(worksheet[cell].v=="frizer") {classwork=2;continue;}
        if(!worksheet[cell].v) continue;
        user.name = worksheet[cell].v
        
        user.name=user.name.trim();
        //formating name to be first + last name
        //removing additional spaces before and after first name and last name;
        let array=user.name.split(" "); //spliting first and last name         
        //removing all unnecessary spaces
        firstname=array.shift();
        lastname=array.pop();
        firstname=firstname.trim();
        user.name=firstname+ " "+ lastname
        
        user.email=firstname+"."+lastname+"@scilijas.com.ba";
        switch (classwork) {
            case 0:itUsers.push(user);  break;
            case 1:basicUsers.push(user); break;
            case 2:hairUsers.push(user); break;
            }         
            user = {}
        }
    
    return [itUsers,basicUsers,hairUsers]
}



module.exports={userRouter,read}  //exporint read function aswell because it is used aswell in /routes/class.js
