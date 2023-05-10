const mongoose = require('mongoose');
require("dotenv").config({ path:'.env'});
const mongoURI = process.env.MONGO_URI;
const connectToMongo =()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("connected to mongoDB")
    })
}

module.exports = connectToMongo;