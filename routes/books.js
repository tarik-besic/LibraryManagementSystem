const express=require('express');
const bookRouter=express.Router();

//controller
let bookController=require('../controllers/booksController');

bookRouter.post('/',bookController.postBookController);
bookRouter.get('/',bookController.getAllBooks);


module.exports=bookRouter;