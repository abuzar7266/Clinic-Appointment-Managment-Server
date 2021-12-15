var Blacklist = require('./Blacklist');
var Defaulter = require('./Defaulter');
var Customer = require('./Customer');
class VerifyBlackListHandler{
    constructor(){

    }
    getIfDefaulter(cnic){
        const Blacklist = new BlackList();
        BlackList.getDefaulterList();
        return BlackList.searchDefaulter(cnic);
    }
}

module.exports = VerifyBlackListHandler;