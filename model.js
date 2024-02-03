const mongoose=require('mongoose');

const Task=new mongoose.Schema({
    todo:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Task',Task);