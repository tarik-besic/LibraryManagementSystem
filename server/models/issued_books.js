const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const IssuedBooksSchema=new Schema({
    name:String,
    email:String,
    class:String,
    book:String,
    date:String,
});

const issuedBook=mongoose.model('issued_books',IssuedBooksSchema);

module.exports=issuedBook;