var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DoctorDesc = new Schema({
    DocID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor'
    },
    name:{
        type:String
    },
    address:{
        type:String
    },
    coordinate:{
        type:String
    },
    cnic:{
        type:String
    },
    email:{
        type:String
    },
    speciality:{
        type:String
    },
    rating:{
        type:String
    },
    degree:{
        type:String
    },
    gender:{
        type:String
    },
    experience:{
        type:String
    }
});
module.exports = mongoose.model('DoctorDesc', DoctorDesc);