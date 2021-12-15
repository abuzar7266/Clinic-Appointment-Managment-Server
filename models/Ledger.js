var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ledger = new Schema({
    number:{
        type:String
    }
});

var LedgerRecord = new Schema({
    LedgerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Ledger'
    },
    total:{
        type:String
    },
    paid:{
        type:String
    },
    PaidOnDate:{
        type:String
    },
    returnAmount:{
        type:String
    }
});

Ledger.plugin(passportLocalMongoose);
module.exports = mongoose.model('Ledger', FineChallan);