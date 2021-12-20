 var Document = require('../../models/Employee');
var ProductModel  = require('../../models/Product');
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
        return DescriptionModel.create({ProductId:pid,Name:des.name,category:des.category,rentCharges:des.rentCharges,maxDayLimit:des.maxDayLimit,finePerDay:des.finePerDay,instruction:des.instruction,thumbnail:des.thumbnail});
    }
    fetchProduct(id){
        return ProductModel.findById(id);
    }
    fetchProductDescription(id){
        return DescriptionModel.find({ProductId:id});
    }
    updateProductDescription(pid,des){
        DescriptionModel.updateOne({ProductID:pid},{Name:des.name,category:des.category,rentCharges:des.rentCharges,maxDayLimit:des.maxDayLimit,finePerDay:des.finePerDay,instruction:des.instruction,thumbnail:des.thumbnail})
        .then((msg)=>{
            console.log(msg);
        })
    }
    updateProduct(pid,Quantity){
        ProductModel.updateOne({ProductID:pid},{Quantity:Quantity});
    }
}

//-----------------------------------!
//Main controller class
class Store
{
    constructor()
    {
        PeristenceFactory.createInstance('MongoDB');
        this.StoreNo = 1;
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
}
class AddProductHandler{
    constructor(){
        PeristenceFactory.createInstance('MongoDB');
    }
    initiateAddProduct(){
        this.Product = null;
        this.Product = new Product();
    }

    setProductDetails(Quantity,Description){
        this.Product.setProductDetails(Quantity,Description);
    }

    confirmAddProduct(){
        let x = this.Product.confirmAddProduct();
        return x;
    }
}

class UpdateProductHandler{
    constructor(){
        PeristenceFactory.createInstance('MongoDB');
        this.Product = new Product();
    }
    verifyProductAvailability(ProductID){
        return this.Product.getProductDetails(ProductID);
    }
    initiateUpdateProduct(ProductID){
        this.Product.setID(ProductID);
    }
    setProductDetails(Quantity,Description){
        this.Product.setProductDetails(Quantity,Description);
    }
    confirmUpdateProduct(){
        this.Product.UpdateProduct();
    }
}


class Product{
    constructor(){
        this.ProductID = '?';
        this.Quantity = 0;
        this.ProductDescription = new ProductDescription();
    }
    setProductDetails(Quantity,Description){
        this.Quantity = Quantity;
        this.ProductDescription.setProductDescription(Description);
    }
    setID(id){
        this.ProductID = id;
    }
    getProductDetails(ID){
        const db = PeristenceFactory.getDB();
        var res = db.fetchProduct(ID);
        var res2 = this.ProductDescription.getProductDescription(ID);
        return {res:res,res2:res2}
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
        db.updateProduct(this.productID,this.Quantity);
        this.ProductDescription.updateProductDescription(this.productID);
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
    getProductDescription(ID){
        const db = PeristenceFactory.getDB();
        let res = db.fetchProductDescription(ID);
        return res;
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
    MongoDB:MongoDB,
    Product:Product,
    UpdateProductHandler:UpdateProductHandler,
    ProductDescription:ProductDescription,
    AddProductHandler:AddProductHandler,
    PeristenceFactory:PeristenceFactory,
    PersistenceHandler:PersistenceHandler
};