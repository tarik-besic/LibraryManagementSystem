const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    class:{
        type:String,
        required:true
    },
    books:[
        {
         type:String
        }
    ],
}

)

const User=mongoose.model('User',userSchema) //(pluralising it first)telling which collection to search in mongodb... in the end it will be users

module.exports=User;