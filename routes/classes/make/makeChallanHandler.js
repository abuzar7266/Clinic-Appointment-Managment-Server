var Challan = require('./Challan');
var BookingChallan = require('./BookingChallan');
var FineChallan = require('./FineChallan');

class makeChallanHandler
{   
    constructor(){

    }
    initiateFineChallan(returnid){
        this.challan = new FineChallan();
        this.challan.initiateChallan(returnid);
    }
    initiateRentChallan(bookingid){
        this.challan = new BookingChallan();
        this.challan.initiateChallan(bookingid);
    }
    setFineChallan(details){
        //setChallan
    }
    setRentChallan(details){
        //setChallan
    }
    getChallan(challanId){
        //get type

      //  this.challan = new Challan();

        //this.challan.getChallan(challanId);
    }
};

module.exports = makeChallanHandler;