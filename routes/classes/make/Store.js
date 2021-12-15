class Store{
    constructor(){
        
    }
    //Login and Logout
    Login(loginAs,username,passowrd)
    {
        const response = null;
        //Get data
        if(response.status===200)
        {
            if(loginAs=="SALESPERSON"){
                this.Employee = new Salesperson();
            }
            else if(loginAs=="CASHIER"){
                this.Employee = new Cashier();
            }
            else if(loginAs=="MANAGER"){
                this.Employee = new Manager();
            }
           // Store Employee Token and Session
           // this.Employee.setEmployeeToken(response.token);
           // this.Employee.setEmployeeDetails(response.PersonalDetails);
        }
    }
    Logout(){
        
    }
    //Booking
    verifyBlackList(CNIC){
        const VerifyBlackListHandler = new VerifyBlackListHandler();
        const Authentication = VerifyBlackListHandler.authenticateCustomer();
        return Authentication;
    }
    initiateBooking(CNIC){
        this.BookProductHandler = new BookProductHandler();
        this.BookProductHandler.initiateBooking(CNIC);
    }
    setProduct(id){
        return this.BookProductHandler.setProduct(id);
    }
    confirmBooking(){
        this.BookProductHandler.confirmBooking();
    }
    generateBookingChallan(id){
        const challan = this.BookProductHandler.getChallan(id);
    }
    //Payment
    verifyChallan(challanID){
        const verifyChallanHandler = new verifyChallanHandler();
        const data = verifyChallanHandler.verifyChallan(challanID);
        return data;
    }
    initiatePayment(){
        this.makePaymentHandler = new makePaymentHandler();
        this.makePaymentHandler.initiatePayment();
    }
    setAmountPaid(amount){
        return this.makePaymentHandler.setAmountPaid(amount);
    }
    confirmPayment(){
        this.makePaymentHandler.confirm();
    }
    generatePaymentReceipt(id){
        const receipt = this.makePaymentHandler.getReceipt(id);
        return receipt;
    }
    //Add Complaint
    verifyReceipt(receiptID){
        const verifyReceiptHandler = new verifyReceiptHandler();
        const receipt = verifyReceiptHandler.getReceipt(receiptID);
        return receipt;
    }
    initiateComplaint(receiptID){
        this.LaunchComplaintHandler = new LaunchComplaintHandler();
        this.LaunchComplaintHandler.initiateComplaint(receiptID);
    }
    setComplaint(subject,complaint){
        this.LaunchComplaintHandler.setComplaint(subject,complaint);
    }
    submitComplaint(){
        const response = this.LaunchComplaintHandler.submit();
        return response;
    }
    generateComplaintReceipt(id){
        const receipt = this.LaunchComplaintHandler.getReceipt(id);
        return receipt;
    }
};

module.exports = Store;