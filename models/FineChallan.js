var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FineChallan = new Schema({
    ChallanId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Challan'
    },
    returnId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Return'
    },
});

FineChallan.plugin(passportLocalMongoose);
module.exports = mongoose.model('FineChallan', FineChallan);