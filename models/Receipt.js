var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Receipt = new Schema({
    Type:{
        type:String
    },
    BookingID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Booking'
    },
    RentID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Rent'
    },
    ReturnID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Return'
    },
    ComplaintID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Receipt'
    },
    PaymentID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Payment'
    },
    ProductID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    Subject:{
        type:String
    },
    Complaint:{
        type:String
    },
    TotalAmount:{
        type:Number
    },
    Days:{
        type:Number
    },
    Quantity:{
        type:Number
    },
    Date:{
        type:Date,
        default:Date.now()
    }

});

module.exports = mongoose.model('Receipt', Receipt);