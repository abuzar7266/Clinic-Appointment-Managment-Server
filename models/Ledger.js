var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ledger = new Schema({
    PaymentID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Payment'
    },
    total:{
        type:Number,
        required:true
    },
    paid:{
        type:Number,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now()
    },
    returnAmount:{
        type:Number,
        required:true
    }
});
module.exports = mongoose.model('Ledger', Ledger);