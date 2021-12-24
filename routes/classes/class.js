 var Document = require('../../models/Employee');
var ProductModel  = require('../../models/Product');
var CustomerModel = require('../../models/Customer');
var BlacklistModel = require('../../models/Blacklist');
var DescriptionModel = require('../../models/ProductDescription');
var BookingModel = require('../../models/Booking');
var ChallanModel = require('../../models/Challan');
var ReceiptModel = require('../../models/Receipt');
var ComplaintModel = require('../../models/Complaint');
var PaymentModel = require('../../models/Payment');
var LedgerModel = require('../../models/Ledger');
var RentModel = require('../../models/Rent');
var ReturnModel = require('../../models/Return');
var express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');

class PersistenceFactory{
    constructor(){
        this.db = null;
    }
    static createInstance(dbname){
        if(!this.db){
            if(dbname==='MongoDB'){
                this.db = new MongoDB();
            }
            else if(dbname==='SQL'){
                this.db = new SQL();
            }
        }
    }
    static getDB(){
        return this.db;
    }
}
class PersistenceHandler{
    constructor(){
        
    }
    print(){
        console.log('None')
    }
}
class MongoDB extends PersistenceHandler
{
    constructor(){
        super();
    }
    print(){
        console.log('Mongo')
    } 
    loginUser(username,password){
        return Document.findOne({username:username})
    }
    addNewProduct(Quantity){
        return ProductModel.create({Quantity:Quantity});
    }
    createProductDescription(pid,des){
        return DescriptionModel.create({ProductId:pid,Name:des.name,category:des.category,rentCharges:des.rentCharges,maxDayLimit:des.maxDayLimit,fineCharges:des.finePerDay,instruction:des.instructions,thumbnail:des.thumbnail});
    }
    fetchProduct = async (id)=>{
        let result = await ProductModel.findById(id);
        return result;
    }
    fetchProductDescription = async (id) => {
        const des = await DescriptionModel.find({ProductId:id});
        return des;
    }
    updateProductDescription(pid,des){
        DescriptionModel.updateOne({ProductId:pid},{Name:des.name,category:des.category,rentCharges:des.rentCharges,maxDayLimit:des.maxDayLimit,fineCharges:des.finePerDay,instruction:des.instructions,thumbnail:des.thumbnail});
    }
    updateProduct(pid,quantity){
        ProductModel.updateOne({_id:pid},{Quantity:quantity})
        .then((msg)=>{
            console.log(msg);
        })
    }
    removeProduct(pid){
       ProductModel.findByIdAndDelete(pid);
    }
    removeProductDescription(pid){
        DescriptionModel.deleteOne({ProductId:pid});
    }
    getCustomer(CNIC){
        var res = CustomerModel.find({CNIC:CNIC});
        return res;
    }
    isCustomerBlacklisted(cnic){
        var res = BlacklistModel.find({CNIC:cnic});
        return res;
    }
    registerCustomer(detail){
        var res =  CustomerModel.create({CNIC:detail.CNIC,nationaility:detail.nationaility,
            city:detail.city,street:detail.street,postalCode:detail.postalCode,dateOfBirth:detail.
            dateOfBirth,phoneNo:detail.phoneNo});
        return res;
    }
    storeBooking = async (CustomerID,ProductID,BookingDate,TotalRent,Days,Quantity)=>{
        var status = await BookingModel.create({CustomerID:CustomerID,ProductID:ProductID,BookingDate:BookingDate,TotalRent:TotalRent,Quantity,Quantity,Days:Days});
        return {status:true,_id:String(status._id)};
    } 
    createBookingChallan = async (Type,BookingID,total,DueDate)=>{
        var status = await ChallanModel.create({Type:Type,BookingID:BookingID,total:total,DueDate:DueDate});
        return {status:true,_id:String(status._id),Issued:(status.Status)};
    }
    createFineChallan = async (Type,ReturnID,total)=>{
        var status = await ChallanModel.create({Type:Type,ReturnID:ReturnID,total:total});
        return {status:true,_id:String(status._id),Issued:(status.Status)};
    }
    createBookingReceipt = async (Type,BookingID,ProductID,TotalAmount,Days,Quantity)=>{
        var status = await ReceiptModel.create({Type:Type,BookingID:BookingID,ProductID:ProductID,TotalAmount:TotalAmount,Days:Days,Quantity:Quantity});
        return {status:true,_id:String(status._id)};
    }
    createReturnReceipt = async(RentID,Fine)=>{
        var status = await ReceiptModel.create({Type:'RETURN',RentID:RentID,Fine:Fine});
        return {status:true,_id:String(status._id)};
    }
    createPaymentReceipt = async (PaymentID,Total,Paid,Return)=>{
        var status = await ReceiptModel.create({Type:'PAYMENT',PaymentID:PaymentID,TotalAmount:Total,Paid:Paid,ReturnAmount:Return});
        return {status:true,_id:String(status._id)};
    }
    createRentReceipt = async (rentid,bookingId,productId,Quantity,returndate)=>{
        var status = await ReceiptModel.create({Type:'RENT',RentID:rentid,ProductID:productId,BookingID:bookingId,Quantity:Quantity,ReturnDate:returndate});
        return {status:true,_id:String(status._id)};
    }
    storeRentedInDB = async (BookingID,ProductID,Quantity,ReturnDate)=>{
        var status = await RentModel.create({BookingID:BookingID,ProductID:ProductID,Quantity:Quantity,ReturnDate:ReturnDate});
        return {status:true,_id:String(status._id)};
    }
    createComplaintReceipt = async (Type,ComplaintID,Subject,Complaint)=>{
        var status = await ReceiptModel.create({Type:'COMPLAINT',ComplaintID:ComplaintID,Subject:Subject,Complaint:Complaint});
        return {status:true,_id:String(status._id)};
    }
    fetchReceipt = async (id)=>{
        var status = await ReceiptModel.findById(id).populate('ReceiptID');
        return {status:true,receipt:status}; 
    }
    storeNewComplaint = async (receiptId,subject,complaint)=>{
        var status = await ComplaintModel.create({ReceiptID:receiptId,Subject:subject,Complaint:complaint});
        return {status:true,complaint:status};
    }
    fetchComplaintList = async ()=>{
        var status = await ComplaintModel.find({});
        return status;
    }
    fetchChallan = async (id)=>{
        var status = await ChallanModel.findById(id);
        return status;
    }
    fetchBooking = async (id)=>{
        var status = await BookingModel.findById(id);
        return status;
    }
    createPayment = async (challanId,total,paid,ret)=>{
        var status = await PaymentModel.create({challanId:challanId,total:total,paid:paid,return:ret});
        return status;
    }
    storePaymentLog = async (PaymentID,Total,Paid,Return)=>{
        var status = await LedgerModel.create({PaymentID:PaymentID,total:Total,paid:Paid,returnAmount:Return});
        return status;
    }
    updateBookingStatus = async (id,status)=>{
        var status = await BookingModel.findByIdAndUpdate(id,{Status:status});
        return status;
    }
    getProductList = async ()=>{
        var list = await DescriptionModel.find().populate('ProductId');
        return list;
    }
    updateRentStatus = async (id,status)=>{
        await RentModel.findByIdAndUpdate(id,{Status:status});
    }
    updateChallanStatus = async (id,status)=>{
        var status = await ChallanModel.findByIdAndUpdate(id,{Status:status});
        return status;
    }
    fetchProductFine=async(id)=>{
        var status = await DescriptionModel.find({ProductId:id});
        return {finePerDay:status.finePerDay};
    }
    fetchRent = async (id)=>{
        var status = await RentModel.findById(id);
        return status;
    }
    addReturn = async (RentID,Fine)=>{
        var status = await ReturnModel.create({RentID:RentID,Fine:Fine});
        return status;
    }
}

//-----------------------------------!
//Main controller class
class Store
{
    constructor()
    {
        PersistenceFactory.createInstance('MongoDB');
        this.Product = new Product();
        this.Customer = new Customer();
        this.StoreNo = 1;
        this.Challan = new Challan;
        this.Booking = new Booking();
        this.Complaint = new Complaint();
        this.Receipt = new Receipt();
        this.Payment = new Payment();
        this.Rent = new Rent();
        this.ProductCatalogue = new ProductCatalogue();
    }
    init(){
        this.Product = new Product();
        this.Customer = new Customer();
        this.StoreNo = 1;
        this.Challan = new Challan;
        this.Booking = new Booking();
        this.Complaint = new Complaint();
        this.Receipt = new Receipt();
    }
    //Login and Logouts
    Login(username,password)
    {       
        const db = PersistenceFactory.getDB();
        return db.loginUser(username,password);
    }
    Logout()
    {       
        const db = PersistenceFactory.getDB();
        return db.logoutUser();
    }
    //Add Product

    initiateAddProduct(){
        this.Product = new Product();
    }

    setProductDetails(Quantity,Description){
        this.Product.setProductDetails(Quantity,Description);
    }

    confirmAddProduct(){
        let x = this.Product.confirmAddProduct();
        return x;
    }

    //Remove Product
    /*1:*/verifyProductAvailability(ProductID){
        return this.Product.getProductDetails(ProductID);
    }
    removeProduct(ProductID){
        return this.Product.removeProduct(ProductID);
    }

    //Update Product
    //Go to 1 then next start here
    initiateUpdateProduct(ProductID){
        this.Product.setID(ProductID);
    }
    setProductDetails(Quantity,Description){
        this.Product.setProductDetails(Quantity,Description);
    }
    confirmUpdateProduct(){
        this.Product.UpdateProduct();
    }
    //Book Product

    verifyCustomer(CustomerDetails)
    {
        var isCust = this.Customer.isCustomer(CustomerDetails.CNIC);
        var isBlacked = this.Customer.isBlacklisted(CustomerDetails.CNIC);
        return {isCust:isCust,isBlacked:isBlacked};
    }
    registerCustomer(CustomerDetails){
        return this.Customer.registerNewCustomer(CustomerDetails);
    }
    initiateBooking(custId){
        this.Booking.setCustomer(custId);
    }
    setBooking = async (pid,quantity,days)=>
    {
        var status = await this.Booking.setProduct(pid);
        if(status)
        {
            status = await this.Booking.setRequiredQuantity(quantity);  
            if(status)
            {
                status = await this.Booking.calculateRent(days);
                return {status,bookingDetails:this.Booking};
            }
            else
            {
                return {status:status,error:'NOT ENOUGH QUANTITY'};
            }
        }
        else
        {
            return {status:status,error:'PRODUCT IS UNAVAILABLE AT THE MOMENT'};
        }
    }
    confirmBooking = async () =>
    {
        if(this.Booking.BookingStatus!=='PRODUCT_UPDATED'){
            var status = await this.Booking.updateProductAvailability();
            if(status){
                this.Booking.BookingStatus = 'PRODUCT_UPDATED';
                status = await this.Booking.SubmitBooking();
                if(status.status){
                    this.Booking.BookingStatus = 'BOOKING_CONFIRMED';
                    status = await this.Booking.makeChallan();
                    if(status.status){
                        console.log(this.Booking.Challan);
                        status = await this.Booking.makeReceipt();
                    }
                }
            }
            else
            {
                return false;
            }
        }
        else{
            console.log('BOOKING IS ALREADY PLACED');
        }
    }
    generateBookingChallan(){

    }
    generateBookingReceipt(){
        
    }

    //Launch Complaint
    verifyReceipt = async (id) =>{
        var status = await this.Receipt.getReceipt(id);
        return status;
    }
    initiateLaunchComplaint(id){
        this.Complaint = new Complaint();
        this.Complaint.setVerifiedReceiptId(id);
    }
    setNewComplaint(subject,complaint){
        this.Complaint.setComplaint(subject,complaint);
    }
    SubmitNewComplaint = async ()=>{
        var response  = await this.Complaint.LaunchNewComplaint();
        var status = await this.Complaint.makeComplaintReceipt(); 
        return response;
    }
    generateComplaintReceipt(){
        return this.Complaint.getReceipt();
    }

    //View Complaint

    getComplaintList = async ()=>{
        var status = await this.Complaint.getComplaintList();
        return status;
    }

    // Make Payment

    verifyChallan = async (id)=>{
        var response = await this.Challan.getChallan(id);
        return response;
    }
    initiateNewPayment(challanID,type,ReferenceID,total){
        this.Payment = new Payment();
        this.Payment.setPaymentDetails(challanID,type,ReferenceID,total);
        return {status:true};
    }
    setAmountPaid(amount){
        var status = this.Payment.setAmountPaid(amount);
        return status;
    }
    confirmNewPayment = async ()=>{
        var status = await this.Payment.confirmNewPayment();
        await this.Challan.updateChallanStatus(this.Payment.ChallanID,'PAID');
        return status;
    }
    generatePaymentReceipt(){
        return this.Payment.getReceipt();
    }

    //Rent Product
    verifyBooking = async (id)=>{
        var status = await this.Booking.getBooking(id);
        return status;
    }
    initiateRent(bookingId,pid,Quantity,Days){
        this.Rent = new Rent();
        this.Rent.setRent(bookingId,pid,Quantity,Days);
    }
    confirmRented = async ()=>{
        var status = await this.Rent.confirmRented();
        var status2 = await this.Booking.updateBookingStatus(this.Rent.BookingID,'RENTED');
        return status;
    }
    generateRentReceipt(){
        return this.Rent.Receipt;
    }

    //Return Product
    verifyRent = async (id)=>{
        var status = await this.Rent.getRent(id);
        return status;
    }
    initiateReturn(rid,bid,pid,quantity,returnDate){
        this.Return = new Return();
        this.Return.setReturn(rid,bid,pid,quantity,returnDate);
    }
    confirmReturn = async ()=>{
        this.Return.calculateFine();
        var status = await this.Return.confirmReturn();
        await this.Booking.updateBookingStatus(this.Return.BookingID,'CLOSED');
        await this.Rent.updateRentStatus(this.Return.RentId,'CLOSED');
        return status;
    }
    generateReturnChallan(){
        return this.Return.getChallan();
    }
    generateReturnReceipt(){
        return this.Return.getReceipt();
    }

    //Browse Catalogue
    getProductCatalogue = async ()=>{
        var list = await this.ProductCatalogue.getProductList();
        return list;
    }

}
class Ledger{
    constructor(){
        this.PaymentID = null;
        this.LedgerID = null;
        this.TotalAmount = null;
        this.PaidAmount = null;
        this.ReturnAmount = null;
        this.PaymentDate = null;
    }
    setLedgerRecord(pid,amount,paid,remaining){
        this.PaymentID = pid;
        this.TotalAmount = amount;
        this.PaidAmount = paid;
        this.ReturnAmount = remaining;
    }
    LogPayment = async (PaymentID,Total,Paid,Return)=>{
        let db = PersistenceFactory.getDB();
        var status = await db.storePaymentLog(PaymentID,Total,Paid,Return);
        return status;
    }
}
class Payment{
    constructor()
    {
        this.PaymentID = null;
        this.ChallanID = null;
        this.ledger = new Ledger();
        this.Type = null;
        this.ReferenceID = null;
        this.Total = null;
        this.Paid = null;
        this.Return = null;
        this.Date = null;
        this.Status = 'INITIATED';
        //Other things
        this.Booking = new Booking();
        this.Receipt = null;
    }
    setPaymentDetails(ChallanId,type,ReferenceId,Total){
        this.ChallanID = ChallanId;
        this.Type = type;
        this.ReferenceID = ReferenceId;
        this.Total = Total;
    }
    setAmountPaid(amount){
        this.Paid = amount;
        this.Return = this.Paid-this.Total;
        if(this.Return<0){
            return {status:false,error:'Amount is less than due'};
        }
        else{
            this.Status = 'PAID';
            return {status:true,return:this.Return};
        }
    }
    confirmNewPayment = async ()=>
    {
        if(this.Status==='PAID')
        {
            let db = PersistenceFactory.getDB();
            console.log(this.ChallanID,this.Total,this.Paid,this.Return);
            var status1 = await db.createPayment(this.ChallanID,this.Total,this.Paid,this.Return);
            this.PaymentID = String(status1._id);
            var status2 = await this.ledger.LogPayment(this.PaymentID,this.Total,this.Paid,this.Return);
            if(this.Type=='BOOKING'){
                var status3 = await this.Booking.updateBookingStatus(this.ReferenceID,'CONFIRMED');
            }
            this.Receipt = new PaymentReceipt();
            this.Receipt.setReceipt(this.PaymentID,this.Total,this.Paid,this.Return);
            var status4 = await this.Receipt.createReceipt();
            return status1;
        }
        else
        {
            return {status:false,error:'First Pay the amount'};
        }
    }
    getReceipt(){
        return this.Receipt;
    }
    //Rent a Product
}
class Rent{
    constructor(){
        this.BookingID = null;
        this.ProductID = null;
        this.Quantity = null;
        this.Days = null;
        this.RentID = null;
        this.ReturnDate = null;
        this.Receipt = null;
    }
    setRent(bookingId,pid,qty,days){
        this.BookingID = bookingId;
        this.Quantity = qty;
        this.ProductID = pid;
        this.Days = days;
    }
    getRentID(){
        return this.RentID;
    }
    getRent = async (id)=>{
        let db = PersistenceFactory.getDB();
        var status = await db.fetchRent(id);
        return status;
    }
    updateRentStatus = async (id,Status)=>{
        let db = PersistenceFactory.getDB();
        await db.updateRentStatus(id,Status);
    }
    confirmRented = async ()=> {
        this.calculateReturnDate();
        let db = PersistenceFactory.getDB();
        var status = await db.storeRentedInDB(this.BookingID,this.ProductID,this.Quantity,this.ReturnDate);
        this.RentID = status._id;
        this.Receipt = new RentReceipt();
        this.Receipt.setReceipt(this.RentID,this.BookingID,this.ProductID,this.Quantity,this.ReturnDate);
        var status2 = await this.Receipt.createReceipt();
        return {rentID:this.RentID};
    }
    calculateReturnDate = async ()=>{
        this.ReturnDate = new Date(Date.now()+((this.Days*3600 * 1000 * 24)));
    }
}
class Booking
{
    constructor()
    {
        this.BookingStatus = 'INVALID';
        this.TotalRent = null;
        this.BookingDate = null;
        this.Quantity = null;
        this.days = null;
        this.customerId = null;
        this.Product = new Product();
        this.Challan = null;
        this.bookingId = null;
        this.Receipt = null;
    }
    getBooking = async (id)=>{
        let db = PersistenceFactory.getDB();
        var status = await db.fetchBooking(id);
        return status;
    }
    updateBookingStatus = async (id,status)=>{
        let db = PersistenceFactory.getDB();
        var status = await db.updateBookingStatus(id,status);
        return status;
    }
    setCustomer(custId){
        console.log('Initiated');
        this.customerId = custId;
    }
    SubmitBooking = async ()=>{
        const db = PersistenceFactory.getDB();
        var status = await db.storeBooking(this.customerId,this.Product.ProductID,this.BookingDate,this.TotalRent,this.days,this.Quantity);
        if(status.status)
        {
            this.bookingId = status._id;
            return {status:true};
        }
        else
        {
            return {status:false,error:"ERROR IN UPLOADING"};
        }
    }
    makeChallan = async ()=>{
       this.Challan = new BookingChallan();
       const date = new Date(Date.now()+(3600 * 1000 * 24));
       this.Challan.setChallan(this.bookingId,this.TotalRent,date);
       var status = await this.Challan.storeInDB();
       if(status.status)
       {
           this.BookingStatus = 'CHALLAN CREATED';
           return status;
       }
       else
       {
            this.BookingStatus = 'FAILED TO CREATE CHALLAN';
            return status;
       }
    }
    makeReceipt = async () =>{
        this.Receipt = new BookingReceipt();
        this.Receipt.setReceipt(this.bookingId,this.Product.getID(),this.TotalRent,this.days,this.Quantity);
        var status = await this.Receipt.storeInDB();
        if(status.status){
        this.Receipt.__receiptID = status._id;
        return status;
        }
        else{
            return {status:false,error:"RECEIPT FAILED"};
        }
    }
    setRequiredQuantity = async (quantity)=>
    {
            if(quantity>this.Product.Quantity)
            {
                return {status:false,error:'NOT ENOUGH SUPPLIES'};
            }
            else
            {
                this.Quantity = quantity;
                this.BookingStatus = 'QUANTITY SET';
                return {status:true};
            }
    }
    updateProductAvailability = async ()=>{
        let x = await this.Product.updateAvailability(this.Quantity);
        return x;
    }
    calculateRent = async (days)=>
    {
        if(this.BookingStatus=='QUANTITY SET'){
            var RentCharges = await this.Product.getRentCharges();
            var maxDays = await this.Product.getMaxDaysLimit();
            if(days<=maxDays){
                this.days = days;
                this.TotalRent = this.Quantity * RentCharges * days;
                this.BookingStatus='TOTAL';
                this.BookingDate = new Date().toISOString();
                return {status:true,TotalRent:this.TotalRent};
            }
            else{
                this.BookingStatus='MAX_LIMIT';
                return {status:false,error:'MAX DAYS LIMIT ERROR'};
            }
        }
    }
    setProduct = async (pid)=>
    {
        var x = await this.Product.setProduct(pid);
        this.Product.ProductID = String(x._id);
        this.Product.Quantity = x.Quantity;
        var y = await this.Product.setProductDescription(pid);
        return {status:true};
    }
}
class Challan{
    constructor(){
        this.__ChallanID = null;
        this.__amountDue = null;
        this.__dueDate = null; 
        this.__Type = 'CHALLAN';
        this.__Status = 'UNDEFINED';
    }
    updateChallanStatus = async (id,status)=>{
        let db = PersistenceFactory.getDB();
        var status = await db.updateChallanStatus(id,status);
        return status;
    }
    setChallanId(id){
        this.__ChallanID = id;
    }
    getChallan = async (id)=>{
        let db = PersistenceFactory.getDB();
        var status = await db.fetchChallan(id);
        return {status:true,challan:status};
    }
    getChallanId(){
        return this.__ChallanID;
    }
    setChallanType(type){
        this.__Type = type;
    }
    setChallan(amountDue,dueDate,Type){
        this.__Type = Type;
        this.__amountDue = amountDue;
        this.__dueDate = dueDate;
    }
}
class BookingChallan extends Challan{
    constructor(){
        super();
        this.__bookingId = null;
    }
    setChallan(bookingId,amountDue,dueDate){
        super.setChallan(amountDue,dueDate,'BOOKING');
        this.__bookingId = bookingId;
        super.setChallanType('BOOKING');
    }
    storeInDB = async () => {
        let db = PersistenceFactory.getDB();
        var status = await db.createBookingChallan(this.__Type,this.__bookingId,this.__amountDue,this.__dueDate);
        if(status.status){
            this.__ChallanID =status._id;
            this.__Status = status.Issued;
            return {status:true};
        }
        else{
            return {status:false,error:'CHALLAN CREATION FAILED'};
        }
    }
}
class FineChallan extends Challan{
    constructor(){
        super();
        this.__returnId = null;
    }
    setChallan(returnId,amountDue){
        super.setChallan(amountDue,Date.now(),'FINE');
        this.__returnId = returnId;
    }
    createFineChallan = async ()=>{
        let db = PersistenceFactory.getDB();
        var status = await db.createFineChallan(this.__Type,this.__returnId,this.__amountDue);
        if(status.status){
            this.__ChallanID =status._id;
            this.__dueDate = Date.now();
            this.__Status = status.Issued;
            return {status:true};
        }
        else{
            return {status:false,error:'CHALLAN CREATION FAILED'};
        }
    }
}
class Complaint
{
    constructor(){
        this.VerifiedReceiptId = null;
        this.Subject = null;
        this.complaint = null;
        this.ComplaintID = null;
        this.Date = null;
        this.ComplaintReceipt = null;
    }
    setVerifiedReceiptId(id){
        this.VerifiedReceiptId = id;
    }
    setComplaint(subject,complaint){
        this.Subject = subject;
        this.complaint = complaint;
    }
    getReceipt(){
        return this.ComplaintReceipt;
    }
    LaunchNewComplaint = async ()=>{
          var db = PersistenceFactory.getDB();
          var status = await db.storeNewComplaint(this.VerifiedReceiptId,this.Subject,this.complaint);
          if(status.status){
                this.ComplaintID = String(status.complaint._id);
                return {status:true,_id:String(status.complaint._id)};
          } 
          else{
              return {status:false,error:'Launch Complaint Failed!'};
          }
    }
    getComplaintList = async ()=>{
        var db = PersistenceFactory.getDB();
        var status = await db.fetchComplaintList();
        return status;
    }
    makeComplaintReceipt = async ()=>{
        this.ComplaintReceipt = new ComplaintReceipt();
        this.ComplaintReceipt.setReceipt(this.ComplaintID,this.Subject,this.complaint);
        var status = await this.ComplaintReceipt.createReceipt();
        this.Date = new Date
        return status;
    }
}
class Receipt {
    constructor(){
        this.__receiptID = null;
        this.__Type = null;
    }
    setReceipt(type){
        this.__Type = type;
    }
    getReceipt = async (id)=>{
        let db = PersistenceFactory.getDB();
        var response = await db.fetchReceipt(id);
        if(response.status){
            return response;
        }
        else{
            return {status:false,error:'Failed to fetch the Receipt'};
        }
    }
}
class RentReceipt extends Receipt{
    constructor(){
        super();
        this.bookingId = null;
        this.productId - null;
        this.quantity = null;
        this.returndate = null;
        this.status = 'RENTED';
        this.rentid = null;
    }
    setReceipt(rentid,bid,pid,qty,retDate){
        super.setReceipt('RENT');
        this.rentid = rentid;
        this.productId = pid;
        this.bookingId = bid;
        this.quantity = qty;
        this.returndate = retDate;
    }
    createReceipt = async ()=>{
        let db = PersistenceFactory.getDB();
        var status = await db.createRentReceipt(this.rentid,this.bookingId,this.productId,this.Quantity,this.returndate);
        if(status.status){
            this.__receiptID = status._id;
            return {status:true};
        }else
        {
            return {status:false,error:'RENT RECEIPT CREATE FAILED'};
        }
    }
}
class Return{
    constructor(){
        this.RentId = null;
        this.ReturnDate = null;
        this.ReturnId = null;
        this.collectionDate = null;
        this.Fine = null;
        this.Receipt = null;
        this.Challan = null;
        this.Product = new Product();
    }
    setReturn(rid,bid,pid,quantity,retDate){
        this.ReturnDate = new Date(retDate);
        this.Quantity = quantity;
        this.BookingID = bid;
        this.ProductID = pid;
        this.RentId = rid;
        this.collectionDate = Date.now();
    }
    getChallan(){
        return this.Challan;
    }
    getReceipt(){
        return this.Receipt;
    }
    calculateFine = async ()=>{
        var status = await this.Product.getFinePerDay(this.ProductID);
        var Date1 = new Date(this.ReturnDate);
        var Date2 = new Date(Date.now());
        var difference = (Date1.getDate()-Date2.getDate());
        var number = Math.ceil(difference/(1000 * 60 * 60 * 24));
        this.Fine = 0;
        this.Fine = this.Quantity * number * status.finePerDay;
        return {status:true,fine:this.Fine};
    }
    confirmReturn = async ()=>{
        let db = PersistenceFactory.getDB();
        var status = await db.addReturn(this.RentID,this.Fine);
        this.ReturnId = String(status._id);
        this.Receipt = new ReturnReceipt();
        this.Receipt.setReceipt(this.ReturnId,this.Fine);
        var status2 = await this.Receipt.createReceipt();
        
        if(this.Fine>0){
            this.Challan = new FineChallan();
            this.Challan.setChallan(this.ReturnId,this.Fine);
            var status3 = await this.Challan.createFineChallan();
            return {status:true,FineStatus:true,ReturnID:this.ReturnId,Fine:this.Fine};
        }
        else{
            return {status:true,FineStatus:false,ReturnID:this.ReturnId};
        }
    }
}
class ProductCatalogue{
    constructor(){
        this.Product = new Product();
    }
    getProductList = async ()=>{
        var list = await this.Product.getProductList();
        return list;
    }
}
class ReturnReceipt extends Receipt{
    constructor(){
        super();
        this.ReturnID = null;
        this.Fine = null;
    }
    setReceipt(rid,fine){
        super.setReceipt('RETURN');
        this.ReturnID = rid;;
        this.Fine = fine;
    }
    createReceipt = async ()=>{
        let db = PersistenceFactory.getDB();
        var status = await db.createReturnReceipt(this.ReturnID,this.Fine);
        if(status.status){
            this.__receiptID = status._id;
            return {status:true}
        }
        else{
            return {status:false,error:'Return Receipt Create Failed'};
        }
    }
}
class BookingReceipt extends Receipt{
    constructor(){
        super();
        this.bookingId = null;
        this.productId - null;
        this.quantity = null;
        this.total = null;
        this.days = null;
    }
    setReceipt(bid,pid,qty,total,days){
        super.setReceipt('BOOKING');
        this.bookingId = bid;
        this.quantity = qty;
        this.total = total;
        this.days = days;
        this.productId = pid;
    }
    storeInDB = async () => {
        let db = PersistenceFactory.getDB();
        var status = await db.createBookingReceipt(this.type,this.bookingId,
            this.productId,this.total,this.days,this.quantity);
            this.__receiptID = status._id;
            return status;
    }
}
class PaymentReceipt extends Receipt{
    constructor(){
        super();
        this.PaymentID = null;
        this.Total = null;
        this.Paid = null;
        this.Return = null;
        this.Status = 'PAID';
        this.Date = null;
    }
    setReceipt(paymentid,total,paid,Return){
        super.setReceipt('PAYMENT');
        this.PaymentID = paymentid;
        this.Total = total;
        this.Paid = paid;
        this.Return = Return;
    }
    createReceipt = async () =>{
        let db = PersistenceFactory.getDB();
        var status = await db.createPaymentReceipt(this.PaymentID,this.Total,this.Paid,this.Return);
        if(status.status){    
            this.Date = new Date(Date.now());
            this.__receiptID = status._id;
            return {status:true};
        }else{
            return {status:false,error:'PAYMENT RECEIPT CREATE FAILED'};
        }
    }
}
class ComplaintReceipt extends Receipt{
    constructor(){
        super();
        this.complaintId = null;
        this.subject = null;
        this.complaint = null;
        this.Date = null;
    }
    setReceipt(complaintId,subject,complaint){
        super.setReceipt('COMPLAINT');
        this.complaintId = complaintId;
        this.subject = subject;
        this.complaint = complaint;
    }
    createReceipt = async ()=>{
        let db = PersistenceFactory.getDB();
        var status = await db.createComplaintReceipt(this.receiptType,this.complaintId,this.subject,this.complaint);
        if(status.status){    
            this.Date = new Date(Date.now());
            this.__receiptID = status._id;
            return {status:true};
        }else{
            return {status:false,error:'COMPLAINT RECEIPT CREATE FAILED'};
        }
    }
}
class Blacklist{
    constructor(){
    }
    isBlacklisted(CNIC){
        const db = PersistenceFactory.getDB();
        var res = db.isCustomerBlacklisted(CNIC);
        return res;
    }
}
class Customer
{
    constructor(){
        this.CNIC = '?';
        this.custId = '?';
        this.name = '?';
        this.nationaility = '?';
        this.city = '?';
        this.street = '?';
        this.postalCode = '?';
        this.dateOfBirth = '?';
        this.phoneNo = '?';
        this.status = 'VALID';
        this.BlackList = new Blacklist();
    }
    setCustomer(detail){
        this.CNIC = detail.CNIC;
        this.custId = detail.custId;
        this.name = detail.name;
        this.nationaility = detail.nationaility;
        this.city = detail.city;
        this.street = detail.street;
        this.postalCode = detail.postalCode;
        this.dateOfBirth = detail.dateOfBirth;
        this.phoneNo = detail.phoneNo;
        this.status = detail.status;
    }
    isCustomer(CNIC)
    {
        const db = PersistenceFactory.getDB();
        var res = db.getCustomer(CNIC);
        return res;
    }
    isBlacklisted(CNIC){
        var res = this.BlackList.isBlacklisted(CNIC);
        return res;
    }
    registerNewCustomer(Details){
        const db = PersistenceFactory.getDB();
        var res = db.registerCustomer(Details);
        return res;
    }
}
class Product{
    constructor(){
        this.ProductID = null;
        this.Quantity = 0;
        this.ProductDescription = new ProductDescription();
    }
    updateAvailability = async (quantity)=>{
        const db = PersistenceFactory.getDB();
        if(this.Quantity-quantity>=0){
            await db.updateProduct(this.ProductID,this.Quantity-quantity);
            return {status:true};
        }
        else{
            return {status:false,error:"INTERNAL SERVER ERROR PLEASE RELOAD"};
        }
    }
    getProductList = async ()=>{
        var list = await this.ProductDescription.getProductList();
        return list;
    }
    getFinePerDay = async (id)=>{
        var status = await this.ProductDescription.getFine(id);
        return status;
    }
    setProductDetails(Quantity,Description){
        this.Quantity = Quantity;
        this.ProductDescription.setProductDescription(Description);
    }
    setID(id){
        this.ProductID = id;
    }
    getRentCharges = async ()=>{
        var value = await this.ProductDescription.getRentCharges();
        return value;
    }
    getMaxDaysLimit = async ()=>{
        var max = await this.ProductDescription.getMaxDays();
        return max;
    }
    getID(){
        return this.ProductID;
    }
    setProduct = async (ID)=>
    {
        const db = PersistenceFactory.getDB();
        var x = db.fetchProduct(ID);
        return x;
    }
    setProductDescription = async (ID)=>
    {
        await this.ProductDescription.getProductDescription(ID);
    } 
    confirmAddProduct(){
        const db = PersistenceFactory.getDB();
        var res = db.addNewProduct(this.Quantity);
        res.then((response)=>{
            this.ProductID = response._id;
            var res2 = this.ProductDescription.confirmProductDescription(response._id);
        })
        return res;
    }
    UpdateProduct(){
        const db = PersistenceFactory.getDB();
        db.updateProduct(this.ProductID,this.Quantity);
        this.ProductDescription.updateProductDescription(this.ProductID);
    }
    removeProduct(productId){
        const db = PersistenceFactory.getDB();
        this.ProductDescription.removeProductDescription(productId);
        db.removeProduct(productId);
    }
}
class ProductDescription{
    constructor(){
        this.name = '?'
        this.category = '?';
        this.rentCharges = 0;
        this.maxDayLimit = 0;
        this.finePerDay = 0;
        this.instructions = '?';
        this.thumbnail = '?';
    }
    getMaxDays = async ()=>{
        return this.maxDayLimit;
    }
    getRentCharges = async ()=>{
        return this.rentCharges;
    }
    getFine = async (id)=>{
        let db = PersistenceFactory.getDB();
        var status = await db.fetchProductFine(id);
        return status;
    }
    getProductList = async () => {
        let db = PersistenceFactory.getDB();
        var list = await db.getProductList();
        return list;
    }
    setProductDescription(Description){
        this.name = Description.name;
        this.category = Description.category;
        this.rentCharges = Description.rentCharges;
        this.maxDayLimit = Description.maxDayLimit;
        this.finePerDay = Description.finePerDay;
        this.instructions = Description.instructions;
        this.thumbnail = Description.thumbnail;
    }
    confirmProductDescription(ProductID){
        const db = PersistenceFactory.getDB();
        let res = db.createProductDescription(ProductID,this);
        return res;
    }
    getProductDescription = async (ID)=>{
        const db = PersistenceFactory.getDB();
        const res = await db.fetchProductDescription(ID);
        this.name = res[0].Name;
        this.category = res[0].category;
        this.rentCharges = res[0].rentCharges;
        this.maxDayLimit = res[0].maxDayLimit;
        this.finePerDay = res[0].fineCharges;
        this.instructions = res[0].instruction;
        this.thumbnail = res[0].thumbnail;
    }
    /*setProductDescription(ProductID){
        const db = PersistenceFactory.getDB();
        let res = db.fetchDescription(ProductID);
        this.setProductDescription(res);
    }*/
    updateProductDescription(ProductID){
        const db = PersistenceFactory.getDB();
        db.updateProductDescription(ProductID,this);
    }
    removeProductDescription(ProductID){
        const db = PersistenceFactory.getDB();
        db.removeProductDescription(ProductID);
    }
}





class Employee{
    constructor(){

    }
    initiateEmployee(){
        this.username = null;
        this.passowrd = null;
        this.CNIC = null;
        this.FullName = null;
        this.Job_Title = null;
        this.DOB = null;
    }
    setEmployee(username,password,CNIC,FullName,Job,DOB){
        this.username = username;
        this.passowrd = password;
        this.CNIC = CNIC;
        this.FullName = FullName;
        this.Job_Title = Job;
        this.DOB = DOB;
    }
    getUsername(){
        return this.username;
    }
    getCNIC(){
        return this.CNIC;
    }
    getPassword(){
        return this.passowrd;
    }
    getFullName(){
        return this.FullName;
    }
    getJobTitle(){
        return this.Job_Title;
    }
    getDOB(){
        return this.DOB;
    }
}

module.exports = {
    Store:Store,
    Receipt:Receipt,
    Complaint:Complaint,
    ComplaintReceipt:ComplaintReceipt,
    BookingReceipt:BookingReceipt,
    MongoDB:MongoDB,
    Blacklist:Blacklist,
    Ledger:Ledger,
    Product:Product,
    Booking:Booking,
    Payment:Payment,
    Customer:Customer,
    Rent:Rent,
    Challan:Challan,
    BookingChallan:BookingChallan,
    FineChallan:FineChallan,
    Return:Return,
    ReturnReceipt:ReturnReceipt,
    PaymentReceipt:PaymentReceipt,
    RentReceipt:RentReceipt,
    ProductDescription:ProductDescription,
    PersistenceFactory:PersistenceFactory,
    PersistenceHandler:PersistenceHandler,
    ProductCatalogue:ProductCatalogue
};