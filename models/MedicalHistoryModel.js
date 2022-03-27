var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PatientDescription = new Schema({
    Pdid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PatientDescription'
    },
    Disease:{
        type:String,
        required:true
    },
    year:{
        type:String
    },
    age:{
        type:String,
        required:true
    },
    meds:{
        type:String
    }
});
module.exports = mongoose.model('PatientDescription', PatientDescription);