const User=require('../models/user')
const issuedBook=require('../models/issued_books');
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
    let result;
    let obj={
        name:req.body.name,
        email:req.body.email,
        schoolClass:req.body.class,
        books:req.body.books
    };
    if(obj.name&&obj.email&&obj.schoolClass&&obj.books)
    {   
        obj.schoolClass=obj.schoolClass.trim();
        obj.email=obj.email.trim();
        obj.name=obj.name.trim();
        try {
        result=await User.findOneAndUpdate({$and:[{name:obj.name},{email:obj.email},{class:obj.schoolClass}]},{$push:{books:obj.books}})
        //adding result aswell to other issued_database
        obj.books=obj.books.name;
        let newObj= new issuedBook({
            name:obj.name,
            email:obj.email,
            class:obj.schoolClass,
            book:obj.books
        });
        await newObj.save();
        if(result)
            res.status(200).json({result});
        else
            res.status(401).json({msg:"Cannot find user.."});
        }
        catch (error) {
        res.status(400).json(error);
        }
    }
}

const user_getusers=async(req, res) => {
    //@getting params from frontend
   let name=req.body.name;
   let book_data=req.body.books||""; //its array
   let schoolClass=req.body.class||"";
   let result;
   let book=book_data.book || "";
   let category=book_data.category || "";

    name=name.toLowerCase();
    
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
        console.log(result);
        res.status(200).json({result:result});
    } catch (error) {
        res.status(400).json(error);
    }
  }
    else
  {  
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
    let _class=req.body.class;
 
    if(!name||!email||!_class)
        res.status(401).json({"msg":"NIJE VALIDAN body"});

    name= name.trim();
    email=email.trim();
    _class=_class.trim();
    
    try {
        result=await User.findOneAndDelete({$and:[{name:name},{email:email},{class:_class}]});
        console.log(result+".");
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