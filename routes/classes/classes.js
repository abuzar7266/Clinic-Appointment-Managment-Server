var Document = require('../../models/Employee');
var express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');

class PeristenceFactory{
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
class MongoDB extends PersistenceHandler{
    constructor(){
        super();
    }
    print(){
        console.log('Mongo')
    }
    loginUser(username,password){
        return Document.find({username:username})
    }
}
class SQL extends PersistenceHandler{
    constructor(){
        super();
    }
    print(){
        console.log('SQL')
    }
}



class Store
{
    constructor()
    {
        PeristenceFactory.createInstance('MongoDB');
        this.StoreNo = 1;
    }
    Login(username,password)
    {       
        const db = PeristenceFactory.getDB();
        return db.loginUser(username,password);
    }
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
}
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
}
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
class Product{
    constructor(){

    }
    setProduct(productId,quanity){
        this.productId = productId;
        this.quanity = quanity;
        this.productDescription = null;
    }
    setProductDescription(description){
        this.productDescription = new ProductDescription();
    }
    getProductDescription(){
        return this.productDescription;
    }
    addProduct(){
        //store product by db handler
    }
    updateProduct(updatedProduct){
        //updateProduct from db handler
    }
    updateProductDescription(description){
        //reload the description
        //store in description
        //update description
    }
}
class ProductDescription{
    constructor(){

    }
    setProductDescription(){
        category = "NONE";
        rentCharges = 0;
        maxDayLimit = 0;
        finePerDay = 0;
        instructions = "";
        thumbnail = "";
    }
}
class ProductCatalogue{
    constructor(){

    }
    setProductCatalogue(){
        const res = null;
        this.ProductList = new Product[res.data.length];
        for(let i=0;i<res.data.length;i++){
            this.ProductList[i].setProduct(res.productId,res.quanity);
            this.ProductList[i].setProductDescription();
        }
    }
}
class addProductHandler{
    constructor(){

    }
    initiateProduct(){
        this.newProduct = new Product();
    }
    setProductDescription(description){

    }
    setProductQuantity(n){

    }

}
class updateProduct{
    constructor(){

    }
    verifyProduct(id){

    }
    initiateProductUpdate(id){
        this.Product = new Product();
        this.Product.initiate();
        this.Product.setProduct(id);
        this.Product.getProductDescription();
    }
    incrementQuanityBy(n){

    }
    decrementProductQuantityBy(n){

    }
    setAvailability(status){

    }
    setDescription(description){

    }
}
class Booking{
    constructor(){
        
    }
    initiateBooking(){
        this.bookingID = null;
        this.totalRent = null;
        this.quantity = null;
        this.Product = null;
        this.BookingDate = null;
        this.ChallanIssued = null;
        this.Status = null;
    }
    setProduct(id,quantity){
        //search product
    }
    getBooking(id){
        //get booking
    }
    addBooking(){

    }
    cancelBooking(){

    }
    makeChallan(){

    }
    calculateRent(){

    }
    getChallan(id){

    }
}
class Customer
{
    constructor()
    {
        
    }
    setCustomer(name,nationaility,city,street,postalCode,dateOfBirth,cnic,phoneNo,status){
        this.id = "";
        this.name = name;
        this.nationaility = nationaility;
        this.city = city;
        this.street = street;
        this.postalCode = postalCode;
        this.dateOfBirth = dateOfBirth;
        this.cnic = cnic;
        this.phoneNo = phoneNo;
        this.status = status;
    }
    getCustomer(cnic){
        let response = null;
        this.id = response.id;
        this.name = response.name;
        this.nationaility = response.nationaility;
        this.city = response.city;
        this.street = response.street;
        this.postalCode = response.postalCode;
        this.dateOfBirth = response.dateOfBirth;
        this.cnic = response.cnic;
        this.phoneNo = response.phoneNo;
        this.status = response.status;
    }
    getName(){
        return this.name;
    }
    storeCustomer(){
        //store and return id;
    }
}
class Defaulter{
    constructor()
    {

    }
    getDefaulter(defaulterDate,CustomerDetail){
        const res = CustomerDetail;
        this.Customer = new Customer();
        this.Customer.setCustomer(res.name,res.nationaility,res.city,res.street,res.postalCode,res.dateOfBirth,res.cnic,res.phoneNo,res.status)
        this.defaultedDate = defaulterDate;
    }
    isDefaulter(Cnic){
        //search in list and return status
    }
}
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
class VerifyBlackListHandler{
    constructor(){

    }
    getIfDefaulter(cnic){
        const Blacklist = new BlackList();
        BlackList.getDefaulterList();
        return BlackList.searchDefaulter(cnic);
    }
}
class BookProductHandler
{
    constructor(){
        
    }
    verifyCustomer(cnic){

    }
    initiateBooking(cnic){

    }
    setProduct(id){

    }
    confirmBooking(){

    }
    generateChallan(id){

    }
    generateReceipt(id){

    }
}
class ReturnProductHandler{
    constructor(){

    }
    verifyCustomer(cnic){

    }
    initiateReturn(){

    }
    verifyRentalProduct(receipt){

    }
    confirmReturn(){

    }
    generateChallan(){

    }
    generateReceipt(){

    }
}
class RentProductHandler{
    constructor(){

    }
    verifyCustomer(cnic){

    }
    initiateRent(){

    }
    verifyPayment(id){

    }
    confirmRented(){

    }
    generateReceipt(){

    }
}
class LaunchComplaintHandler{
    constructor(){

    }
    verifyReceipt(receiptId){

    }
    initiateNewComplaint(){

    }
    enterComplaint(subject,complaint){

    }
    submitComplaint(){

    }
    generateReceipt(){

    }
}
class Complaint{
    constructor(){

    }
    initiateComplaint(){
        this.complaintId = "";
        this.subject = "";
        this.complaint = "";
        this.receiptId = "";
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
class Receipt{
    
}
class BookingReceipt extends Receipt{

}
class PaymentReceipt extends Receipt{

}
class ReturnReceipt extends Receipt{

}
class ComplaintReceipt extends Receipt{

}
class Payment{
    constructor(){
        this.total = null;
        this.paidAmount  = null;
        this.paidDate = null;
        this.challanId = null;
    }
}
class CashPayment extends Payment{
    constructor(){
        super();
        this.returnAmount = null;
    }
}
class CreditCardPayment extends Payment{
    constructor(){
        super();
        this.cardNumber = null;
        this.serviceCharges = null;
        this.CardType = null;
    }
}
class makePaymentHandler{
    constructor(){

    }
    verifyChallan(id){

    }
    initiatePayment(id,methodDetails){

    }
    setAmountPaid(amount){
        
    }
    confirmPayment(){

    }
    generateReceipt(id){

    }
    
}
module.exports = {
    Store : Store,
    Employee:Employee,
    Customer:Customer,
    Payment:Payment,
    Challan:Challan,
    FineChallan:FineChallan,
    BookingChallan:BookingChallan,
    Booking:Booking,
    Product:Product,
    ProductDescription:ProductDescription,
    ProductCatalogue:ProductCatalogue,
    CashPayment:CashPayment,
    CreditCardPayment:CreditCardPayment,
    Receipt:Receipt,
    BookingReceipt:BookingReceipt,
    ReturnReceipt:ReturnReceipt,
    ComplaintReceipt:ComplaintReceipt,
    Complaint:Complaint,
    ReturnProductHandler:ReturnProductHandler,
    BookProductHandler:BookProductHandler,
    makeChallanHandler:makeChallanHandler,
    makePaymentHandler:makePaymentHandler,
    RentProductHandler:RentProductHandler,
    LaunchComplaintHandler:LaunchComplaintHandler,
    Defaulter:Defaulter,
    BlackList:BlackList,
    VerifyBlackListHandler:VerifyBlackListHandler,
    Ledger:Ledger
}