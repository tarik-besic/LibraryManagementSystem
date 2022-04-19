import Request from "../../index";

class IssuedBooks extends Request{

    static getBooks(){
        return Request.get("/books")
    }
    static updateBook(book){
        return Request.post("/books",{book})
    }


}

export default IssuedBooks;