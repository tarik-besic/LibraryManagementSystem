const Category=require('../models/category');

const getCategories=async(req,res)=>
{
    let arrayOfCategories;
try {
    arrayOfCategories=await Category.find({});
    res.status(200).json({arrayOfCategories})
    }
catch (error) {
    console.log(error);
    res.status(501).json({
        msg:"Some problem while fetching categories from database"
    })
}
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

const updateCategory=async(req,res)=>{
    try{
        const result=await Category.findByIdAndUpdate({_id:req.body._id},{name:req.body.name});
        if(result){
            console.log("radim i ovo1")
            res.status(200).json({msg:"Category updated"})
        }
        else{
            console.log("radim i ovo2")
            res.status(404).json({msg:"Category not found"})

        }
    }catch(err){
        console.log("radim i ovo3")
        console.log(err);
        res.status(400).json({err})
    }
}

const deleteCategory=async(req,res)=>{
    let name=req.body.name;  
    let result;
    try {
        result=await Category.findOneAndDelete({name:name});
    } catch (error) {
        console.log(error);
    }

    if(result)
    {
        res.status(200).json(result)
    }
    else 
    res.status(401).json({msg:"Cannot find the category"});

}

module.exports={
    getCategories,
    postCategory,
    updateCategory,
    deleteCategory
}