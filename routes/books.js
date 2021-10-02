const express=require('express');
const bookRouter=express.Router();

//controller
let bookController=require('../controllers/booksController');

bookRouter.get('/',bookController.getAllBooks);
bookRouter.post('/',bookController.postBook);
bookRouter.patch('/',bookController.updateBook);
bookRouter.delete('/',bookController.deleteBook);

module.exports=bookRouter;