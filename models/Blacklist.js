var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Blacklist = new Schema({
    CNIC:{
        type:String
    }
});

module.exports = mongoose.model('Blacklist', Blacklist);