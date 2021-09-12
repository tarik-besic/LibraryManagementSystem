const express = require('express')
const dotenv=require('dotenv')
const connectDB=require('./config/database');
const {userRouter}=require('./routes/user');
const classRouter=require('./routes/class');
const rmFileRouter=require('./routes/rmFile')
const Book=require('./models/book')

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

//setting view engine
app.set('view engine','ejs');

// using express router

app.use('/users',userRouter);
app.use('/class',classRouter);
app.use('/removefile',rmFileRouter);

app.get('/', (req, res) => {
    
    res.render('index');
})
app.get('/books', async(req, res) => {
    let arrayOfBooks=await Book.find({});
    console.log(arrayOfBooks)
    res.render('books',{arrayOfBooks});
})
app.post('/books',(req,res)=>{

    let name=req.body.name;
    let author=req.body.author;
    let quantityAll=req.body.quantityAll;
    let quantityFree=req.body.quantityFree;
    let isbn=req.body.isbn;

    console.log(quantityFree)
     let book=new Book({
         name:name,
         author:author,
         quantityAll:quantityAll,
         quantityFree:quantityFree,
         isbn:isbn
         })
         book.save().then((data)=>{
         //   res.status(200).send(data)

         })

// let user_database=new User({
//         name:name,
//         email:email,
//         class:schoolclass,
//         books:books
//     })
})


const PORT=process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`)
})

