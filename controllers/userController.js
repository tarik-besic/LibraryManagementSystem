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
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
    finally{
        res.status(200).json(result);
    }
    
};

const user_update_book=async(req,res)=>{
    let result;
    let name=req.query.name;
    let email=req.query.email;
    let schoolClass=req.query.class;
    let books=req.query.book;

    if(name&&email&&schoolClass&&books)
    {
        
        schoolClass=schoolClass.trim();
        email=email.trim();
        name=name.trim();
        books=books.trim();
        try {
        result=await User.findOneAndUpdate({$and:[{name:name},{email:email},{class:schoolClass}]},{$push:{books:books}})
    } catch (error) {
        res.status(400).send(error)
    }
    finally{
        res.status(200).send(result);
    }   
    }
}

const user_getusers=async(req, res) => {

    //@getting params from frontend
  
   let name=req.query.name;
   let book=req.query.book;
   let schoolClass=req.query.class;
   let result;
  
   //checking which params are sent by user...
   //I made a jqeury function that doesnt send empty params rather only the ones with string. Location of function:(public/javascript/jqeury.js --on the bottom of file)
    if(name)  //checking if name is defined
    name=name.toLowerCase();
    
    if(book)book=book.toLowerCase();
  
    if(!schoolClass) schoolClass="/"; //setting it to something unusual so search results will be 0 if the name or book or class is not sent by a client.   
    
    if(!name) name='/';   
  
    if(!book)book='/';
   
    if(name=='/'&&book=='/'&&schoolClass=='/')  //if 0 params are sent by user..we just get all users from database
   {   
       try {
        result=await User.find({})   //getting all users from database
    } catch (error) {
        res.send(error)
    }finally{
        res.send(result)
    }
  }
    else
  {  
      try {
        result=await User.find({$or:[{name:{$regex:name}},{class:{$regex:schoolClass}},{books:{$elemMatch: {name:book}}}]}) //searhcing for user in database that has either contains name,class or book 
    } catch (err) {
        console.log(err)
    }    
    finally{       
        res.status(200).send(result)
    }}
    
  }
module.exports={
    user_create_one,
    user_update_book,
    user_getusers
}