var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Doctor = new Schema({
    areaCode:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model('Doctor', Doctor);