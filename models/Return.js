var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Return = new Schema({
    RentID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Rent'
    },
    Fine:{
        type:Number
    },
    CollectionDate:{
        type:Date,
        default:Date.now()
    },
    Status:{
        type:String,
        default:'CONFIRMED'
    }
});

module.exports = mongoose.model('Return', Return);