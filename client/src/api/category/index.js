import Request from "../index";

class CategoryApi extends Request{

    static addCategory(category){
        return Request.post("/category",category);
    }
    static getCategories(category){
        return Request.get("/category");
    }
    static updateCategory(category){
        return Request.patch("/category",category);
    }
    static deleteCategory(category){
        return Request.delete("/category",category);
    }
}
export default CategoryApi;