const express=require('express');
const bookRouter=express.Router();

//controller
let bookController=require('../controllers/booksController');

bookRouter.post('/one',bookController.getOneBook);
bookRouter.post('/issuenew',bookController.postIssueNewBook);
// bookRouter.get('/issuenewbook',bookController.getIssueNewBooks);
bookRouter.get("/issued",bookController.getIssuedBooks)



bookRouter.get('/',bookController.getAllBooks);
bookRouter.post('/',bookController.postBook);
bookRouter.patch('/',bookController.updateBook);
bookRouter.delete('/',bookController.deleteBook);

bookRouter.get('/return',bookController.getReturnBook);
bookRouter.delete('/return',bookController.deleteReturnBook);
bookRouter.post('/return',bookController.postReturnBook);


module.exports=bookRouter;