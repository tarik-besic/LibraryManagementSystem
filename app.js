const express = require('express')
const fs=require('fs');
const dotenv=require('dotenv')
const connectDB=require('./config/database');

const {userRouter}=require('./routes/user');
const classRouter=require('./routes/class');


//load config
dotenv.config({path:'./config/config.env' })

//database connection
connectDB();

// Express app
const app = express()

// Middleware fucntions

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname + '/public'))
app.set('view engine','ejs');

// using express router
app.use('/users',userRouter);
app.use('/class',classRouter);


app.get('/', (req, res) => {
    
    res.render('index');
})

app.post("/removefile", (req, res) => {
    
    const path = './public/uploadedFile.xlsx'   

    if(fs.existsSync("./public/uploadedFile.xlsx"))  //gotta check if the file exists first...or server error occures 
    fs.unlinkSync(path);         //deleteing file       
        res.render('index');
    
})


const PORT=process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`)
})

