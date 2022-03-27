var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PatientDescription = new Schema({
    Pid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient'
    },
    Did:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor'
    },
    timeSlot:{
        type:String
    },
    date:{
        type:String
    },
    status:{
        type:String,
        default:'U'
    }
});
module.exports = mongoose.model('PatientDescription', PatientDescription);