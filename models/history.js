const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const historySchema=new Schema({
    year:{
        type:String,
        required:true
    },
    users:{
        type:Number,
        required:true
    },
    perMonth:{
        type:Array
    },
    totalBooks:{
        type:String
    }
})

const History=mongoose.model('history_data',historySchema);

module.exports=History;