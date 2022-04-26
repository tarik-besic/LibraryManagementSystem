const Book = require('../models/book');
const Category = require('../models/category');
const issuedBook = require('../models/issued_books');
const User = require('../models/user');
const postBook = async (req, res) => {
    try {
        let book = new Book({
            name: req.body.name?.trim().toLowerCase(),
            author: req.body.author?.trim().toLowerCase(),
            category: req.body.category?.trim().toLowerCase(),
            quantityAll: req.body.quantityAll,
            quantityFree: req.body.quantityFree,
            isbn: req.body.isbn?.trim()
        });

        await book.save();
        res.status(200).json({ "msg": "book added to database" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ err })
    }



    // //had a problem where the stored values had additional spaces before or after..I just trim them here and then save them to database
    // let object={
    //  name:req.body.name ? req.body.name.trim().toLowerCase() : "" ,
    //  author:req.body.author ? req.body.author.trim().toLowerCase() : "",
    //  category:req.body.category ? req.body.category.trim() : "" ,
    //  quantityAll:req.body.quantityAll ? req.body.quantityAll.trim() : "",
    //  quantityFree:req.body.quantityFree ? req.body.quantityFree.trim() : "" ,
    //  isbn:req.body.isbn ? req.body.isbn.trim() : "" ,
    // }
    //  if(Number(object.quantityAll)&& Number(object.quantityFree))
    //     {
    //         object.quantityAll=Number(object.quantityAll);
    //         object.quantityFree=Number(object.quantityFree)
    //     }

    // try{
    //      book=new Book({
    //      name:object.name,
    //      author:object.author,
    //      category:object.category,
    //      quantityAll:object.quantityAll,
    //      quantityFree:object.quantityFree,
    //      isbn:object.isbn
    //      });
    //     }
    // catch(err){console.log(err)}

    // try{
    //      await book.save();
    //      res.status(200).json({
    //      msg:"Book added",
    //      book:book
    //      });
    //     }
    // catch(err)
    //      {
    //      console.log("Book is not saved");
    //      console.log(err);
    //      res.status(400).json({
    //      msg:"Problem while adding book.." //never used
    //     });
    //         }

}
const getAllBooks = async (req, res) => {
    let arrayOfBooks;
    // console.log("USAO TARE")
    // let booksCategories;
    try {
        arrayOfBooks = await Book.find({});
        // booksCategories=await Category.find({});
    } catch (error) {
        console.log(error);
    }

    // res.render('books',{arrayOfBooks,booksCategories});
    // console.log(booksCategories)
    res.json({ books: arrayOfBooks })
}
const getOneBook = async (req, res) => {
    let name = req.body.name;
    let result;
    name = name ? name.trim() : "/";
    try {
        result = await Book.find({ name: { $regex: name } });
        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
    }

}
const updateBook = async (req, res) => {
    const { book } = req.body
    console.log("Usao");
    try {
        const result = await Book.findByIdAndUpdate({ _id: book._id }, { name: book.name, author: book.author, category: book.category, quantityAll: book.quantityAll, quantityFree: book.quantityFree, isbn: book.isbn });
        if (result)
            res.status(200).json({ "msg": "Book updated" })
        else
            res.status(404).json({ "msg": "Not Found" })

    } catch (err) {
        res.status(400).json({ err })
    }
}
const deleteBook = async (req, res) => {
    if (!req.body.id)
        res.status(400).json({ "msg": "Problem while deleting a book" })
    let result;
    try {
        result = await Book.findByIdAndDelete({ _id: req.body.id })
        res.status(200).json(result);
    } catch (err) {
        console.log(err)
        res.status(400).json({ "msg": "Problem while deleting a book" })
    }
}
const postIssueNewBook = async (req, res) => {






};
const getReturnBook = async (req, res) => {
    res.render('returnbook');
};
const postReturnBook = async (req, res) => {
    let result;
    let name = req.body.name;
    console.log("usao si da dodas novu returnknjigu");

    try {
        result = await issuedBook.find({ name: { $regex: name } });
        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};
const deleteReturnBook = async (req, res) => {
    let result;
    let obj = {
        name: req.body.name ? req.body.name.trim() : "",
        email: req.body.email ? req.body.email.trim() : "",
        class: req.body.class ? req.body.class.trim() : "",
        book: req.body.book ? req.body.book.trim() : "",
        issuedDate: req.body.issuedDate ? req.body.issuedDate.trim() : ""
    };

    try {
        result = await issuedBook.findOneAndDelete(({ $and: [{ name: obj.name }, { email: obj.email }, { class: obj.class }, { book: obj.book }] }));

        result = await User.updateOne({ name: obj.name, email: obj.email, class: obj.class, books: { $elemMatch: { name: obj.book } } }, { $pull: { books: { name: obj.book } } }); //searching user and deleting its book aswell from user table

        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};

const getIssuedBooks = async (req, res) => {

    try{
        const result=await issuedBook.find({});
        res.status(200).json({result});
    }catch(err){
        console.log(err);
        res.status(500).json({err});
    }


}

module.exports = {
    postBook,
    getAllBooks,
    updateBook,
    deleteBook,
    postIssueNewBook,
    getOneBook,
    getReturnBook,
    postReturnBook,
    deleteReturnBook,
    getIssuedBooks
}