const mongoose = require('mongoose');

const DB = "mongodb+srv://vivek:vivek123@cluster0.cb704.mongodb.net/cleancode?retryWrites=true&w=majority"

const connect = async() =>{
    try{
        await mongoose.connect(DB);
        console.log("connected to database");
    }catch(err){
        console.log(err);
    }
}

module.exports = connect;