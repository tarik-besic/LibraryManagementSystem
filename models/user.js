const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userCategorySchema=({
    category:{
        type:String
    },
    name:{
        type:String,
    }
})

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
        userCategorySchema
    ],
}

)

const User=mongoose.model('User',userSchema) //(pluralising it first)telling which collection to search in mongodb... in the end it will be users

module.exports=User;