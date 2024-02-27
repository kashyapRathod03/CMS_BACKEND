const mongoose=require('mongoose');

mongoose.set('strictQuery',false);
const db = mongoose.connect("mongodb+srv://kashyaprathod03:cms@cluster0.wctzuup.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/dashboard").then(()=>{console.log("database connection successfull")}).catch((err)=>{console.log(err)}); 

module.exports = db

// const db = mongoose.connect("mongodb://127.0.0.1:27017/dashboard").then(()=>{console.log("database connection successfull")}).catch((err)=>{console.log(err)}); 
