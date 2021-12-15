var Customer = require('./Customer');
var Defaulter = require('./Defaulter');
class BlackList{
    constructor(){

    }   
    getDefaulterList(){
        const res = null;
        this.Blacklist = new Defaulter[res.data.length];
        for(let i=0;i<res.data.length;i++){
            this.Blacklist[i].setDefaulter(res.data.defaulterDate,res.data.CustomerDetail)
        }
    }
    searchDefaulter(cnic){

    }
}
module.exports = BlackList;