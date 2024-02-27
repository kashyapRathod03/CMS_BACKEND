const mongoose=require('mongoose');

mongoose.set('strictQuery',false);
const db = mongoose.connect("mongodb://127.0.0.1:27017/dashboard").then(()=>{console.log("database connection successfull")}).catch((err)=>{console.log(err)}); 

module.exports = db