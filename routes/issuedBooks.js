const express=require('express');
const issuedBooksRouter=express.Router();

//controller
let issuedBooksController=require('../controllers/issuedBooksController');


issuedBooksRouter.get('/',issuedBooksController.getIssuedBooks)


module.exports=issuedBooksRouter;