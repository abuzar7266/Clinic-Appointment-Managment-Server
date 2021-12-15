var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Defaulter = new Schema({
    CustomerID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    },
    Reason:{
        type:String
    }
});

module.exports = mongoose.model('Booking', Booking);