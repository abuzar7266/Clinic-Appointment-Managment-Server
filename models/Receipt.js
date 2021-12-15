var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Receipt = new Schema({
    receiptType:{
        type:String,
        required:true
    }
});
var RentReceipt = new Schema({
    receiptId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Receipt'
    },
    BookingID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Booking'
    }
});

var ComplaintReceipt = new Schema({
    receiptId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Receipt'
    },
    ComplaintID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Complaint'
    }
});

var ReturnReceipt = new Schema({
    receiptId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Receipt'
    },
    ReturnID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Return'
    }
});

module.exports = {
    Receipt:mongoose.model('ProductCatalogue', ProductCatalogue),
    RentReceipt:mongoose.model('RentReceipt', RentReceipt),
    ComplaintReceipt:mongoose.model('ComplaintReceipt', ComplaintReceipt),
    ReturnReceipt:mongoose.model('ReturnReceipt', ReturnReceipt)
}