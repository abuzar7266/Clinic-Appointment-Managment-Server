class Ledger{
    costructor(){
        this.number = null;
    }
    setLedger(){
        //get ledger number from db handler
        //store in this.number
    }
    logpayment(NewPayment){
        //store payment details in ledger document
        //return record id
    }

}
module.exports = Ledger;