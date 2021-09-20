const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const BookSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    quantityAll:{
        type:String,
        required:true
    },
    quantityFree:
        {
         type:String,
         required:true
        },
    isbn:
        {
         type:String,
         required:true  
        }
}
)
const Book=mongoose.model('book',BookSchema) //(pluralising it first)telling which collection to search in mongodb... in the end it will be users

module.exports=Book;