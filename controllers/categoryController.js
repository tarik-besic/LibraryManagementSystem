const Category=require('../models/category');

const getCategories=async(req,res)=>
{
    let arrayOfCategories;
try {
    arrayOfCategories=await Category.find({});
    res.status(200).render('category',{arrayOfCategories});
    }
catch (error) {
    console.log(error);
    res.status(501).json({
        msg:"Some problem while fetching categories from database"
    })
}}

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
    let name=req.body.name;  
    let update=req.body.update; 
    if(name)
    {
        name=name.trim();
        update=update.trim();
    }
    let result;
    try {
        result=await Category.findOneAndUpdate({name:name},{name:update},{new:true}); //adding update and new true so I get object after updating it
    } catch (error) {
        console.log(error);
    }

    if(result)
    {
        res.status(200).json(result)
    }
    else 
    res.status(400).json({msg:"Cannot find the category"});

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