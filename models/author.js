const mongoose = require('mongoose');

const authorSchema =  new mongoose.Schema({
    name : { type : String , required : true},
    email : String,
})

module.exports = mongoose.model('Author', authorSchema);