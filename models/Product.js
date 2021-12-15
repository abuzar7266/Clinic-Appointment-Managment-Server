var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = new Schema({
    Quantity:{
        type:Number,
        min:0
    }
});
var ProductDescription = new Schema({
    ProductId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    Name:{
        type:String
    },
    rentCharges:{
        type:Number
    },
    fineCharges:{
        type:Number
    }
});

module.exports = {
    Product:mongoose.model('Product', Product),
    ProductDescription:mongoose.model('ProductDescription', ProductDescription)
}