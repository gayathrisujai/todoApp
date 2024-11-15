const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://gayathri_sujai:gayathri123@cluster0.ykdkh.mongodb.net/todoApp?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log("Connection established");
}).catch(()=>{
    console.log("Error in connection");
})