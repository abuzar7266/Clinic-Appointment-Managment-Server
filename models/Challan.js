var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Challan = new Schema({
    Type:{
        type:String,
        required:true
    },
    BookingID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Booking'
    },
    ReturnID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Return'
    },
    total:{
        type:Number
    },
    DueDate:{
        type:Date,
        default:Date.now()
    },
    Status:{
        type:String,
        default:'ISSUED'
    }

});
module.exports = mongoose.model('Challan', Challan);