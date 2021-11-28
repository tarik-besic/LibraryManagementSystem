const issuedBook=require('../models/issued_books');

const getIssuedBooks=async(req,res)=>{

    let result=await issuedBook.find({});

    result=result.map((user)=>{ //this is so I remove unnecessary attributes that MongoDB adds on result
        let newUser={
            name:user.name,
            email:user.email,
            _class:user.class,
            book:user.book,
            issuedDate:user.date
        }
        return newUser;
    })
    res.render('issuedBooks',{issuedUsers:result})
}

module.exports={
    getIssuedBooks
}