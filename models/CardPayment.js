var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardPayment = new Schema({
    Payment_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Payment'
    },
    CardNo:{
        type:String,
        required:true
    },
    CardType:{
        type:String,
        required:true
    }
});

CardPayment.plugin(passportLocalMongoose);
module.exports = mongoose.model('CardPayment', CardPayment);