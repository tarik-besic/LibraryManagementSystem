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
app.use(express.static('public'))
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
    arrayOfUsers=read()
    res.render('index',{arrayOfUsers});
})

app.get('/adduser', (req, res) => {
    res.render('adduser');
     /*  user.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    })*/
})


app.post("/upload", upload.single("upload"), (req, res) => {
    
    arrayOfUsers=read()
    res.render('index',{arrayOfUsers});

})
app.post("/removefile", (req, res) => {
    
    const path = './public/uploadedFile.xlsx'
    

    if(fs.existsSync("./public/uploadedFile.xlsx"))  //it was spamming my console that file was already deleted...that's why I put to check if file exists to delete it then
    fs.unlinkSync(path);

    
      
    
    
        arrayOfUsers=read()
        res.render('index',{arrayOfUsers});
    

})


app.listen(5000, () => {
    console.log("Server is listening on port 5000...")
})




function read()
{
    let readThisFile;
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