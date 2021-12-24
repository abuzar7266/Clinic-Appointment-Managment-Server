var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Payment = new Schema({
    total:{
        type:Number
    },
    paid:{
        type:Number
    },
    return:{
        type:Number
    },
    challanId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Challan'
    },
    Date:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        default:'Paid'
    }
});
module.exports = mongoose.model('Payment', Payment);