var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PatientDescription = new Schema({
    Pid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient'
    },
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String
    },
    cnic:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
        min:0
    },
    address:{
        type:String
    }
});
module.exports = mongoose.model('PatientDescription', PatientDescription);