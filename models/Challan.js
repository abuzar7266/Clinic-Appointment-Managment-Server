var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Challan = new Schema({
    Type:{
        type:String
    },
    total:{
        type:String
    },
    DueDate:{
        type:Date,
        default:Date.now()
    }
});

Challan.plugin(passportLocalMongoose);
module.exports = mongoose.model('Challan', Challan);