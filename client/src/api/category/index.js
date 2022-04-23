import Request from "../index";

class CategoryApi extends Request{

    static addCategory(category){
        return Request.post("/category",{category});
    }
    static getCategories(category){
        return Request.get("/category");
    }
}
export default CategoryApi;