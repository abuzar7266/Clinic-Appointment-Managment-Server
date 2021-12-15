var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookingChallan = new Schema({
    ChallanId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Challan'
    },
    BookingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Booking'
    },
});

BookingChallan.plugin(passportLocalMongoose);
module.exports = mongoose.model('BookingChallan', BookingChallan);