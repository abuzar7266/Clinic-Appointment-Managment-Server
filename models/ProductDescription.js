var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductDescription = new Schema({
    ProductId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    Name:{
        type:String
    },
    category:{
        type:String
    },
    rentCharges:{
        type:Number
    },
    fineCharges:{
        type:Number
    },
    maxDayLimit:{
        type:Number
    },
    instruction:{
        type:String
    },
    thumbnail:{
        type:String
    }
});

module.exports = mongoose.model('ProductDescription', ProductDescription)