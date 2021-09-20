const Book=require('../models/book')
const Category=require('../models/category');

const postBookController=async(req,res)=>{

    let name=req.body.book;
    let author=req.body.author;
    let quantityAll=req.body.quantityAll;
    let quantityFree=req.body.quantityFree;
    let isbn=req.body.isbn;
    let book;
    try{
         book=new Book({
         name:name,
         author:author,
         quantityAll:quantityAll,
         quantityFree:quantityFree,
         isbn:isbn
         });
        }
    catch(err){console.log(err)}
    
    try{
         await book.save();
        }
         catch(err)
         {
            console.log("Book is not saved");
            console.log(err);
             res.status(400).json({
                msg:"Problem while adding book.."
             });
            }
         finally{
            res.status(200).json({
                msg:"Book added",
                book:book
             });
         }
}
const getAllBooks=async(req, res) => {
    let arrayOfBooks;
    let booksCategories;
    try {
        arrayOfBooks=await Book.find({});
        booksCategories=await Category.find({});
    } catch (error) {
        console.log(error);
    }
    
    res.render('books',{arrayOfBooks,booksCategories});
}

module.exports={
    postBookController,
    getAllBooks
}