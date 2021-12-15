var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Employee = new Schema({
    username:{
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    CNIC:{
        type: String,
    },
    FullName:{
        type:String
    },
    DOB:{
        type:String
    },
    Job_Title:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Employee', Employee);