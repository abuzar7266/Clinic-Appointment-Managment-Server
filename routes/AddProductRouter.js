var express = require('express');
const ESSerializer = require('esserializer');
var ProductDescript = require('../models/ProductDescription');
const { ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking } = require('./classes/class');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Router = express.Router();
Router.route('/initiate')
    .post(function(req,res,next){
        if(req.session.login=='LOGGED IN' & req.session.acess=='Manager'){
        var handler = ESSerializer.deserialize(req.session.handler,[ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking]);
        handler.initiateAddProduct();
        req.session.handler = ESSerializer.serialize(handler);
        res.statusCode = 200;
        res.json({status:true});
        }
        else{
            res.statusCode=401;
            res.json({status:false,error:'unauthorized'});
        }
    });
Router.route('/set')
    .post(function(req,res,next)
    {
        if(req.session.login=='LOGGED IN' & req.session.acess=='Manager')
        {
            var handler = ESSerializer.deserialize(req.session.handler,[ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking]);
            handler.setProductDetails(req.body.Quantity,req.body.Description);
            req.session.handler = ESSerializer.serialize(handler);
            res.statusCode = 200;
            res.json({status:true});
        }
        else{
            res.statusCode=401;
            res.json({status:false,error:'unauthorized'});
        }
    });
Router.route('/confirm')
    .post(function(req,res,next)
    {
        if(req.session.login=='LOGGED IN' & req.session.acess=='Manager')
        {
            var handler = ESSerializer.deserialize(req.session.handler,[ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking]);
            var data = handler.confirmAddProduct();
            data.then((msg)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(msg);
            });
        }
        else{
            res.statusCode=401;
            res.json({status:false,error:'unauthorized'});
        }
    });
module.exports = Router;