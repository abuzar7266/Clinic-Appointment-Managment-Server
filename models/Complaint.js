var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Complaint = new Schema({
    Subject:{
        type:String,
        required:true
    },
    ReceiptID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Receipt'
    },
    Complaint:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now()
    }
});
module.exports = mongoose.model('Complaint', Complaint);