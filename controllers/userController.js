const User=require('../models/user')

const user_create_one=async(req,res)=>{
    let name=req.body.name;
    let email=req.body.email;
    let schoolclass=req.body.class;
    let books=req.body.books
    let result;

     if(name)name=name.toLowerCase();
     if(email)email=email.toLowerCase();
     if(schoolclass)schoolclass=schoolclass.toLowerCase();
   
    try {
        let user_database=new User({
            name:name,
            email:email,
            class:schoolclass,
            books:books
        });
        result=await user_database.save()
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

const user_update_book=async(req,res)=>{
    console.log("update si knjigu");
    let result;
    let name=req.body.name;
    let email=req.body.email;
    let schoolClass=req.body.class;
    let books=req.body.books;

    console.log(name+"."+email+"."+schoolClass+"."+books+".")
    if(name&&email&&schoolClass&&books)
    {   
        schoolClass=schoolClass.trim();
        email=email.trim();
        name=name.trim();
        try {
        result=await User.findOneAndUpdate({$and:[{name:name},{email:email},{class:schoolClass}]},{$push:{books:books}})
        console.log(result);
        res.status(200).json(result);
        }
        catch (error) {
        res.status(400).json(error);
    }
    
    }
}

const user_getusers=async(req, res) => {
    console.log("DOSAO2 SI")
    
    //@getting params from frontend
   let name=req.body.name;
   let book_data=req.body.books; //its array
   let schoolClass=req.body.class;
   let result;
   let book=book_data.book || "";
   let category=book_data.category || "";

   if(name)  //checking if name is defined
    name=name.toLowerCase();
    
   if(book)
    book=book.toLowerCase();
  
   if(schoolClass=="")
    schoolClass="/"; //setting it to something unusual so search results will be 0 if the name or book or class is not sent by a client.   

   if(name=="")
    name='/';   

   if(book=="")
    book='/';

   if(category=="")
   category='/';
   
    if(name=='/'&&book=='/'&&schoolClass=='/'&&category=='/')  //if 0 params are sent by user..we just get all users from database
   {   
       console.log("NISI POSLAO NISTA");
       try {
        result=await User.find({})   //getting all users from database
        res.status(200).json({result:result});
    } catch (error) {
        res.status(400).json(error);
    }
  }
    else
  {  console.log("POSLAO SI NESTA");
      try
       {
        result=await User.find({$or:[{name:{$regex:name}},{class:{$regex:schoolClass}},{books:{$elemMatch:{$or:[{name:book},{category:category}]}}}]}) //searhcing for user in database that has either contains name,class or book 
        res.status(200).json({result:result});
        }
    catch (err) 
    {
        console.log(err)
        res.status(500).json({msg:"some problem..."});
    }    
  }
}
const user_delete=async(req,res)=>{
    let name,email,result;
 
    name=req.body.name;
    email=req.body.email;
    if(!name||!email)
        res.status(401).json({"msg":"NIJE VALIDAN body"});

    name= name.trim();
    email=email.trim();
    
    try {
        result=await User.findOneAndDelete({$and:[{name:name},{email:email}]});
        if(result)
            res.status(200).json({msg:"user deleted"});
        else
            res.status(401).json({msg:"User is not found"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Problem with database"});
    }
};

module.exports={
    user_create_one,
    user_update_book,
    user_getusers,
    user_delete
}