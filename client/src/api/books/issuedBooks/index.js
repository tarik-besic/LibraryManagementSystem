import Request from "../../index";

class IssuedBooksApi extends Request{

    static getBooks(){
        return Request.get("/books")
    }
    static updateBook(book){
        return Request.post("/books",{book})
    }
    static deleteBook(id){
        return Request.delete("/books",{id})
    }
    
}

export default IssuedBooksApi;