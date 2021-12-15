var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Payment = new Schema({
    Method:{
        type:String
    },
    total:{
        type:String
    },
    paid:{
        type:String
    },
    challanId:{
        type:mongoose.Schema.Types.ObjectId
    },
    Date:{
        type:Date,
        default:Date.now()
    }
});

Payment.plugin(passportLocalMongoose);
module.exports = mongoose.model('Payment', Payment);