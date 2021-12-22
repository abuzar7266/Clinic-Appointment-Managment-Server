var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer = new Schema({
    CNIC:{
        type: String,
        unique:true,
        required:true
    },
    nationality:{
        type:String
    },
    city:{
        type:String
    },
    street:{
        type:String
    },
    postalCode:{
        type:String
    },
    name:{
        type:String
    },
    dateOfBirth:{
        type:String
    },
    phoneNo:{
        type:String
    },
    status:{
        type:String,
        default:'VALID'
    }
});
module.exports = mongoose.model('Customer', Customer);