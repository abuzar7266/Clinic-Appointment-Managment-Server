var Challan = require('./Challan');
class BookingChallan extends Challan
{    
    initiateChallan(){
        this.challanId = null;
        this.totalAmount = null;
        this.paidAmount = null;
        this.dueDate = null;
        this.bookingId = null;
        this.challanType = "BOOKING";

    }
    setChallan(){

    }
}

module.exports = BookingChallan;