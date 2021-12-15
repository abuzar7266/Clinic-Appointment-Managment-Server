var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Return = new Schema({
    ReceiptID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Receipt'
    },
    ProductID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    ReturnDate:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Return', Return);