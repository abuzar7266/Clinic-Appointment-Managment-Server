var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer = new Schema({
    CNIC:{
        type: String,
    },
    Country:{
        type:String
    },
    City:{
        type:String
    },
    Street:{
        type:String
    },
    PostalCode:{
        type:String
    },
    FirstName:{
        type:String
    },
    LastName:{
        type:String
    },
    DOB:{
        type:String
    },
    MobileNo:{
        type:String
    }
});
module.exports = mongoose.model('Customer', Customer);