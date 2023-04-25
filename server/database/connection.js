const mongoose = require('mongoose')

exports.connectDB = async()=> {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connection Successful")
    }
    catch(err){
        console.log(err)
    }
}
    