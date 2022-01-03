const History=require("../models/history");

const getYear=async(req,res)=>{

    let result;
    let year= "2021/2022";

    try{
        if(!year || !(Number(year)))
            throw("Please send in year");
            
        result= await History.find({year:year});
        console.log("Nastavljamo sa try catchom")
        res.json({
            message:result
        });
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
            totalBooksIssued:req.body.totalBooksIssued
        })
        obj.save();
        res.status(200).json({msg:"Saved successfully"})
    } catch (error) {
        res.json({error})
    }
}
const deleteYear=async(req,res)=>{

    //authenticate user first

    //then delete
    try {
        History.findOneAndDelete({year:year})
    } catch (error) {
        res.json({error})
    }
}
module.exports={
    getYear,
    saveYear,
    deleteYear
}