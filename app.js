const express = require('express')
const path = require("path")
const XLSX = require("xlsx")
const multer = require('multer')
const mongoose = require('mongoose');
const User = require("./models/user")
const fs=require('fs');


const app = express()

//connect to mongoDB
const dbURI = "mongodb+srv://tarik-besic:{password}@cluster0.pk5um.mongodb.net/user-data?retryWrites=true&w=majority"
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => console.log("Database connected")).catch((err) => console.log(err)) //ovo je async task pa mogu nastavit sa .then()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname + '/public'))
app.set('view engine','ejs');

const storage = multer.diskStorage({ //telling multer where to store the file
     
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


app.get('/', (req, res) => {
    
    res.render('index');
})

app.get('/users', (req, res) => {
    
    arrayOfUsers=read();
    res.render('users',{arrayOfUsers});
})


app.post("/upload", upload.single("upload"), (req, res) => {
    
    arrayOfUsers=read()
    res.render('createClass',{arrayOfUsers});

})
app.post("/removefile", (req, res) => {
    
    const path = './public/uploadedFile.xlsx'
    

    if(fs.existsSync("./public/uploadedFile.xlsx"))  //gotta check if the file exists first...or server error occures 
    fs.unlinkSync(path);         //deleteing file       
        res.render('index');
    

})
app.get("/class",(req,res)=>{
    arrayOfUsers=read()
    res.render('createClass',{arrayOfUsers})

})

app.post("/uploadusers",async (req, res) => {
     
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
         
         lastname=lastname.trim();}
         else {
        lastname="NOLASTNAME"
        adddata=false;
        }
                 
        if(user.email.includes("@"))
        {
            email=true;

        }
        else
        {email=false;} //if client forgot email is false
        
        
        //if the user didn't input first and last name and if he messed up email then its error
        if(firstname==="undefined"||lastname==="undefined"|| email==false)
        {
            adddata=false
        }
       
         else 
         {
         user.name=firstname+ ' '+ lastname;

        
        }
        
    });
    //spliting each user into specific array and then insterting them into database
    //also adding them class
    let user={};
    
    switch (counter) {
        case 1:
            element.forEach(x => { //saving each user into database
                    user_database=new User({
                    name:x.name,
                    email:x.email,
                    class:"1-a"
                })
               user_database.save().then(()=>console.log("IT UserSaved"));
            });
            break;  
        case 2:
            element.forEach(x => {
                    user_database=new User({
                    name:x.name,
                    email:x.email,
                    class:"1-b"
                })
                user_database.save().then(()=>console.log("Basic UserSaved"));
            });
            break;
        case 3:
            element.forEach(x => {
                    user_database=new User({
                    name:x.name,
                    email:x.email,
                    class:"1-c"
                })
                user_database.save().then(()=>console.log("Hair UserSaved"));
            });
            break;
    }
        //first gotta update all classes
        
        //user_database.findById({name{}})
        
      
        
      
   });
  

//{class: /.*1-a.*/i} //regex za pronaci osobe koji su 1-a

//TESTIRAM KAKO DA UPDATEAM SVE RAZREDE NAKON STO NAPRAVIS NOVI RAZRED (MORAT CU I IZBRISAT SVE cetvrte razrede sa obzirom da se ovo radi na kraju godine.)
//ali imaj na umu da prvo sacuvas koliko je knjiga rentano za history stats class

//let tare=await User.find({name:"Tarik Besic"},{$set: {class:'2-a'},function(err,model){if(err)console.log("ERROR"); else console.log(model)}});   
   res.send(tare)

if(adddata)
res.status(200).render("index")
else if(adddata==false)
res.status(401).render("index");

})
app.listen(5000, () => {
    console.log("Server is listening on port 5000...")
})


//function for reading excel file to server.
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

                case 1:basicUsers.push(user);   break;
                
                case 2:hairUsers.push(user); break;
            }
            
            user = {}
        }
    }

    return [itUsers,basicUsers,hairUsers]
}
