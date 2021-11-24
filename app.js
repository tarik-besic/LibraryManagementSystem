const express = require('express')
const dotenv=require('dotenv')
const connectDB=require('./config/database');

//routers
const {userRouter}=require('./routes/user');
const classRouter=require('./routes/class');
const rmFileRouter=require('./routes/rmFile');
const bookRouter=require('./routes/books');
const categoryRouter=require('./routes/category');
const issuedBooksRouter=require('./routes/issuedBooks')
//load config
dotenv.config({path:'./config/config.env' })

//database connection
connectDB();

// Express app
const app = express();

// Middleware fucntions
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));

//setting view engine
app.set('view engine','ejs');

// using express router
app.use('/users',userRouter);
app.use('/class',classRouter);
app.use('/removefile',rmFileRouter);
app.use('/books',bookRouter);
app.use('/category',categoryRouter);
app.use('/issuedBooks',issuedBooksRouter);
app.get('/', (req, res) => {  
    res.render('index');
})

const PORT=process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`)
})

