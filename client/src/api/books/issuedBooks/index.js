import Request from "../..";

class IssuedBookApi {

    static getBooks(){
        return Request.get("/books/issued")
    }
    static issueNew(){
        return Request.post("/books/issued",)
    }
    
}

export default IssuedBookApi;