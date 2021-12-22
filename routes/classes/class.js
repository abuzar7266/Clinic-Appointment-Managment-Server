 var Document = require('../../models/Employee');
var ProductModel  = require('../../models/Product');
var CustomerModel = require('../../models/Customer');
var BlacklistModel = require('../../models/Blacklist');
var DescriptionModel = require('../../models/ProductDescription');
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
}

//-----------------------------------!
//Main controller class
class Store
{
    constructor()
    {
        PeristenceFactory.createInstance('MongoDB');
    }
    init(){
        this.Product = new Product();
        this.Customer = new Customer();
        this.StoreNo = 1;
        this.Challan = null;
        this.Booking = new Booking();
    }
    //Login and Logouts
    Login(username,password)
    {       
        const db = PeristenceFactory.getDB();
        return db.loginUser(username,password);
    }
    Logout()
    {       
        const db = PeristenceFactory.getDB();
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
    setBooking = async(pid,quantity,days)=>
    {
        var status = await this.Booking.setProduct(pid);
        /*if(status)
        {
            status = this.Booking.setRequiredQuantity(quantity);  
            if(status)
            {
                status = this.Booking.calculateRent(days);
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
        }*/
    }
    confirmBooking()
    {
        //console.log(this.Booking);
    }
    generateBookingChallan(){

    }
    generateBookingReceipt(){
        
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
        this.customerId = null;
        this.ProductId = null;
        this.Product = new Product();
    }
    setCustomer(custId){
        console.log('Initiated');
        this.customerId = custId;
    }
    setRequiredQuantity(quantity)
    {
            if(quantity>this.Product.Quantity)
            {
                return {status:false};
            }
            else
            {
                this.Quantity = quantity;
                this.BookingStatus = 'QUANTITY SET';
                return {status:true};
            }
    }
    updateProductAvailability(){
        return this.Product.updateAvailability(this.Quantity);
    }
    calculateRent(days)
    {
        if(this.BookingStatus=='QUANTITY SET'){
            var RentCharges = this.Product.getRentCharges();
            var maxDays = this.Product.getMaxDaysLimit();
            if(days<=maxDays){
                this.TotalRent = this.Quantity * RentCharges * days;
                this.BookingStatus='TOTAL';
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
        //var y = await this.Product.setProductDescription(pid);
        //this.ProductId = this.Product.ProductID;
        /*if(this.ProductId){
            this.BookingStatus = 'FETCHED';
            return {status:true};
        }
        else{
            this.ProductId = null;
            this.BookingStatus = 'UNAVAILABLE';
            return {status:false};
        }*/
    }
}
class Challan{
    constructor(){
        this.__ChallanID = null;
        this.__amountDue = null;
        this.__dueDate = null; 
        this.__Type = 'CHALLAN';
    }
    setChallanId(id){
        this.__ChallanID = id;
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
    }
    storeInDB(){
        
    }
}
class FineChallan extends Challan{
    constructor(){
        super();
        this.__returnId = null;
    }
    setChallan(returnId,amountDue,dueDate){
        super.setChallan(amountDue,dueDate,'FINE');
        this.__returnId = returnId;
    }
    storeInDB(){

    }
}
class Blacklist{
    constructor(){
    }
    isBlacklisted(CNIC){
        const db = PeristenceFactory.getDB();
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
        const db = PeristenceFactory.getDB();
        var res = db.getCustomer(CNIC);
        return res;
    }
    isBlacklisted(CNIC){
        var res = this.BlackList.isBlacklisted(CNIC);
        return res;
    }
    registerNewCustomer(Details){
        const db = PeristenceFactory.getDB();
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
    updateAvailability(quantity){
        const db = PeristenceFactory.getDB();
        if(this.Quantity-quantity>=0){
            db.updateProduct(this.ProductID,this.Quantity-quantity);
            return {status:true};
        }
        else{
            return {status:false,error:"INTERNAL SERVER ERROR PLEASE RELOAD"};
        }
    }
    setProductDetails(Quantity,Description){
        this.Quantity = Quantity;
        this.ProductDescription.setProductDescription(Description);
    }
    setID(id){
        this.ProductID = id;
    }
    getRentCharges(){
        var value = this.ProductDescription.getRentCharges();
        return value;
    }
    getMaxDaysLimit(){
        var max = this.ProductDescription.getMaxDays();
        return max;
    }
    getID(){
        return this.ProductID;
    }
    setProduct(ID)
    {
        const db = PeristenceFactory.getDB();
        var x = db.fetchProduct(ID);
        x.then((res)=>{
            this.ProductID = res._id;
            this.Quantity = res.Quantity;
        })
        return x;
    }
    setProductDescription(ID)
    {
        this.ProductDescription.getProductDescription(ID);
    } 
    confirmAddProduct(){
        const db = PeristenceFactory.getDB();
        var res = db.addNewProduct(this.Quantity);
        console.log('res:'+res);
        res.then((response)=>{
            this.productID = response._id;
            var res2 = this.ProductDescription.confirmProductDescription(response._id);
        })
        return res;
    }
    UpdateProduct(){
        const db = PeristenceFactory.getDB();
        db.updateProduct(this.ProductID,this.Quantity);
        this.ProductDescription.updateProductDescription(this.ProductID);
    }
    removeProduct(productId){
        const db = PeristenceFactory.getDB();
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
    getMaxDays(){
        return this.maxDayLimit;
    }
    getRentCharges(){
        return this.rentCharges;
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
        const db = PeristenceFactory.getDB();
        let res = db.createProductDescription(ProductID,this);
        return res;
    }
    getProductDescription = async (ID)=>{
        const db = PeristenceFactory.getDB();
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
        const db = PeristenceFactory.getDB();
        let res = db.fetchDescription(ProductID);
        this.setProductDescription(res);
    }*/
    updateProductDescription(ProductID){
        const db = PeristenceFactory.getDB();
        db.updateProductDescription(ProductID,this);
    }
    removeProductDescription(ProductID){
        const db = PeristenceFactory.getDB();
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
    MongoDB:MongoDB,
    Blacklist:Blacklist,
    Product:Product,
    Booking:Booking,
    Customer:Customer,
    ProductDescription:ProductDescription,
    PeristenceFactory:PeristenceFactory,
    PersistenceHandler:PersistenceHandler
};