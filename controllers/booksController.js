const Book=require('../models/book');
const Category=require('../models/category');
const issuedBook=require('../models/issued_books');
const User=require('../models/user');
const postBook=async(req,res)=>{
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
const getOneBook=async(req,res)=>{
    let name=req.body.name;
    let result;
    name=name ? name.trim() : "/";
    try {
        result= await Book.find({name:{$regex:name}});
        res.status(200).json({result});
    } catch (error) {
        console.log(error);
    }

}
const updateBook=async(req,res)=>{
    let result;
    let object={
        name:req.body.bookName,
        author:req.body.authorName,
        category:req.body.bookCategory,
        quantityAll:req.body.bookQntyAll,
        quantityFree:req.body.bookQntyFree,
        isbn:req.body.bookIsbn,
        originalName:req.body.originalName
       }
       console.log(object);
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
const deleteBook=async(req,res)=>{
    let bookName=req.body.name;
    let result;
    bookName=bookName.trim();
    try{
        result=await Book.findOneAndDelete({name:bookName});
        if(result)
        res.status(200).json({"msg":"Book deleted"})
        else 
        res.status(400).json({"msg":"Cannot find book"})
    }
    catch(err){
        console.log(err)
        res.status(400).json({"msg":"Problem while deleting book"})
    }
}
const getIssueNewBooks=async(req,res)=>{
    res.render('issuenewbook');
};
const getReturnBook=async(req,res)=>{
    res.render('returnbook');
};
const postReturnBook=async(req,res)=>{
    let result;
    let name=req.body.name;
    console.log("usao si da dodas novu returnknjigu");

    try {
        result=await issuedBook.find({name:{$regex:name}});
        res.status(200).json({result});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error});
    }
};
const deleteReturnBook=async(req,res)=>{
    let result;
    console.log("usao si da izbrises knjigu")

    let obj={
        name:req.body.name.trim(),
        email:req.body.email.trim(),
        class:req.body.class.trim(),
        book:req.body.book.trim()
    };

    try {
        result=await issuedBook.findOneAndDelete(({$and:[{name:obj.name},{email:obj.email},{class:obj.class},{book:obj.book}]}));
   
        result=await User.updateOne({name:obj.name,email:obj.email,class:obj.class,books:{$elemMatch:{name:obj.book}}},{$pull:{books:{name:obj.book}}}); //searching user and deleting its book aswell from user table
 
        res.status(200).json({result});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error});
    }
};

module.exports={
    postBook,
    getAllBooks,
    updateBook,
    deleteBook,
    getIssueNewBooks,
    getOneBook,
    getReturnBook,
    postReturnBook,
    deleteReturnBook
}