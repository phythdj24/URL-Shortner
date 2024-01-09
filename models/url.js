const mongoose = require('mongoose');
const shortid = require('shortid')


const urlSchema = new mongoose.Schema({
    shortID:{
        type: String,
        required: true,
        default: shortid(),
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [{
        timestamp: {type: Number}
    }]

    
},
{ timestamps: true }
)

const URL = mongoose.model('url', urlSchema)

module.exports = URL;
