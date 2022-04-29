import Request from "../index";

class BookApi{

    static getBooks(){
        return Request.get("/books")
    }
    static updateBook(book){
        return Request.patch("/books",{book})
    }
    static deleteBook(id){
        return Request.delete("/books",{id})
    }
    static addBook(book){
        return Request.post("/books",book)
    }
    
}

export default BookApi;