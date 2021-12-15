var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductCatalogue = new Schema({
    ProductId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }
});

module.exports = mongoose.model('ProductCatalogue', ProductCatalogue);