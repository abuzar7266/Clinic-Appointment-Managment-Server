var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CashPayment = new Schema({
    Payment_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Payment'
    },
    return:{
        type:String
    }
});
CashPayment.plugin(passportLocalMongoose);
module.exports = mongoose.model('CashPayment', CashPayment);