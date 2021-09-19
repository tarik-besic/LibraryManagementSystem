const Category=require('../models/category');

const getCategories=async(req,res)=>
{
    let result;
try {
    result=await Category.find({});

    }
catch (error) {
    console.log(error);
}

res.status(200).json(result);

}

const postCategory=async(req,res)=>{

    let name=req.body.name;
    if(name)  //triming only spaces before the name of category and after...eg:"  romance  "=>"romance"
        name=name.trim();
        
    try {
        let category=new Category({
            name:name
        })

    await category.save();
    res.status(200).json(category);
    } catch (error) {
        console.log(error);
    }

}

module.exports={
    getCategories,
    postCategory
}