const issuedBook=require('../models/issued_books');

const cardBooksController=async(req, res) => {  
    let arrayOfBooks;
    
    try{

        arrayOfBooks=await issuedBook.countDocuments();
    }
    catch(err){
        console.log(err);
    }
    
    res.render('index',{data:arrayOfBooks});
}

module.exports=cardBooksController;