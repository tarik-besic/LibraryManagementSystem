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
     //had a problem where the stored values had additional spaces before or after..I just trim them here and then save them to database
     object.name=object.name.trim();
     object.author=object.author.trim();
     object.category=object.category.trim();
     object.name=object.name.toLowerCase();
     object.name=object.author.toLowerCase();
     object.isbn=object.isbn.trim();
     if(Number(object.quantityAll)&& Number(object.quantityFree))
        {
            object.quantityAll=Number(object.quantityAll);
            object.quantityFree=Number(object.quantityFree)
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
         res.status(200).json({
         msg:"Book added",
         book:book
         });
        }
    catch(err)
         {
         console.log("Book is not saved");
         console.log(err);
         res.status(400).json({
         msg:"Problem while adding book.." //never used
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
const updateBook=async(req,res)=>{
    let result
    let object={
        name:req.body.bookName,
        author:req.body.authorName,
        category:req.body.bookCategory,
        quantityAll:req.body.bookQntyAll,
        quantityFree:req.body.bookQntyFree,
        isbn:req.body.bookIsbn,
        originalName:req.body.originalName
       }
    
       //had a problem where the stored values had additional spaces before or after..I just trim them here and then save them to database
    object.name=object.name.trim();
    object.name=object.name.toLowerCase();
    object.author=object.author.trim();
    object.author=object.author.toLowerCase();
    object.category=object.category.trim()
    object.isbn=object.isbn.trim();
    object.originalName=object.originalName.trim(); 
    object.quantityAll=Number(object.quantityAll);
    object.quantityFree=Number(object.quantityFree);

       try {
           console.log("pokusavam naci"+object.originalName)
            result=await Book.findOneAndReplace({name:object.originalName},{
            name:object.name,
            author:object.author,
            category:object.category,
            quantityAll:object.quantityAll,
            quantityFree:object.quantityFree,
            isbn:object.isbn,
            })
            console.log("ZAVRSIO TRY:"+result)
    } catch (error) {
        console.log(error);
        res.status(400);
    }
if(result!=null)
{
    res.status(200).json(result);
}
else{
    console.log(object);
    res.status(400).json(object); //sending the book that client sent me
}
}


module.exports={
    postBookController,
    getAllBooks,
    updateBook
}