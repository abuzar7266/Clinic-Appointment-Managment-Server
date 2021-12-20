var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = new Schema({
    Quantity:{
        type:Number,
        min:0
    }
});
module.exports = mongoose.model('Product', Product)