var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Rent = new Schema({
    BookingID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Booking'
    },
    ProductID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    Quantity:{
        type:Number,
    },
    ReturnDate:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        default:'RENTED'
    }
});

module.exports = mongoose.model('Rent', Rent);