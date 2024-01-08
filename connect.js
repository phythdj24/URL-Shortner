const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
const connectTomongoDB = async(url)=>{
    return mongoose.connect(url)
}

module.exports = {
    connectTomongoDB
}