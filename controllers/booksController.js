const Book=require('../models/book')
const Category=require('../models/category');

const postBookController=async(req,res)=>{
    let book;
    
    let object={
     name:req.body.name,
     author:req.body.author,
     category:req.body.category,
     quantityAll:req.body.quantityAll,
     quantityFree:req.body.quantityFree,
     isbn:req.body.isbn,
     
    }
    try{
         book=new Book({
         name:object.name,
         author:object.author,
         category:object.category,
         quantityAll:object.quantityAll,
         quantityFree:object.quantityFree,
         isbn:object.isbn
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