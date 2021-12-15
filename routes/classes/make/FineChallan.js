var Challan = require('./Challan');
class FineChallan extends Challan{
    constructor(){
       super();
    }
    initiateChallan(){
        this.challanId = null;
        this.totalAmount = null;
        this.paidAmount = null;
        this.dueDate = null;
        this.returnId = null;
        this.challanType = "FINE";
    }
    setChallan(){

    }
}
module.exports = FineChallan;