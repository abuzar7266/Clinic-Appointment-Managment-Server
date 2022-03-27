var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Available = new Schema({
    scheduleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Schedule'
    },
    status:{
        type:String,
        default:'A'
    }
});
module.exports = mongoose.model('Aavailable', Available);