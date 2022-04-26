const express = require('express')
const dotenv=require('dotenv')
const connectDB=require('./config/database');
const cors = require('cors')
//routers
const {userRouter}=require('./routes/user');
const classRouter=require('./routes/class');
const rmFileRouter=require('./routes/rmFile');
const bookRouter=require('./routes/books');
const categoryRouter=require('./routes/category');
const dashboardRouter=require('./routes/dashboard')
const historyRouter=require('./routes/history')
//load config
dotenv.config({path:'./config/config.env' })

//database connection
connectDB();

// Express app
const app = express();

app.use(cors());

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
app.use('/',dashboardRouter);
app.use('/history',historyRouter);

const PORT=process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`)
})

