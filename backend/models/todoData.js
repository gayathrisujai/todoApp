const mongoose= require('mongoose');

const todoSchema=   mongoose.Schema({
    Id: String,
    list: String,
    day:String
});

const todo=mongoose.model('todo',todoSchema);


module.exports=todo;