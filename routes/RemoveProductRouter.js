var express = require('express');
const ESSerializer = require('esserializer');
const {ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking} = require('./classes/class');
var mongoose = require('mongoose');
var ProductDescript = require('../models/ProductDescription');
const bodyParser = require('body-parser');
var Router = express.Router();
Router.route('/verify')
    .get(function(req,res,next){
        if(req.session.login=='LOGGED IN' & req.session.access=='Manager')
        {
            var handler = ESSerializer.deserialize(req.session.handler,[ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking]);
            var x = handler.verifyProductAvailability(req.body.ProductId);
            req.session.handler = ESSerializer.serialize(handler);
            x.res.then((msg1)=>{
                x.res2.then((msg2)=>{
                    res.setHeader('Content-Type', 'application/json');
                    res.json({Product:msg1,Description:msg2});
                });
            });
        }
        else
        {
            res.statusCode=401;
            res.json({status:false,error:'unauthorized'});
        }
    });
Router.route('/confirm')
    .get(function(req,res,next){
        if(req.session.login=='LOGGED IN' & req.session.access=='Manager')
        {
            var handler = ESSerializer.deserialize(req.session.handler,[ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking]);
            handler.removeProduct(req.body.ProductId);
            req.session.handler = null;
            res.statusCode=200;
            res.json({status:true});
        }
        else
        {
            res.statusCode=401;
            res.json({status:false,error:'unauthorized'});
        }
    });
module.exports = Router;