const History=require("../models/history");

const getYear=async(req,res)=>{

    let result;
    let year= "2021/2022";

    try{
        if(!year)
            throw("Please send in year");
            
        result= await History.find({year:year});
        console.log(result)
        res.status(200).render("history",{data:result})
    }
    catch(error){
        res.status(501).json({
            error
        });
    }
}

const saveYear=async(req,res)=>{    
    
    try {
        const obj= new History({
            year: req.body.year,
            users:req.body.users,
            perMonth:req.body.perMonth,
            totalBooks:req.body.totalBooks
        })
        await obj.save();
        res.status(200).json({msg:"Saved successfully"})
    } catch (error) {
        res.json({msg:error})
    }
}
const deleteYear=async(req,res)=>{

    //authenticate user first

    //then delete
    try {
        await History.findOneAndDelete({year:req.body.year})
        res.json({msg:"Year deleted"})

    } catch (error) {
        res.json({error})
    }
    
}
module.exports={
    getYear,
    saveYear,
    deleteYear
}