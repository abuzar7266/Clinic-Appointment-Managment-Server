class Challan
{
    constructor(){
        
    }
    initiateChallan()
    {
        this.challanId = null;
        this.totalAmount = null;
        this.paidAmount = null;
        this.dueDate = null;
        this.challanType = null;
        this.status = "UNPAID";
    }
    setChallan(){

    }
}

module.exports = Challan;