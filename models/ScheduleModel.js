var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Schedule = new Schema({
    timeSlot:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Slot'
    }
});
module.exports = mongoose.model('Patient', Patient);