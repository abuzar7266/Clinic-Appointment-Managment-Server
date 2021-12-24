var express = require('express');
const ESSerializer = require('esserializer');
var ProductDescript = require('../models/ProductDescription');
const { ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking } = require('./classes/class');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Router = express.Router();
Router.route('/verifyCustomer')
    .post(function(req,res,next){
        if(req.session.login=='LOGGED IN' & req.session.acess=='Manager')
        {
            var handler = ESSerializer.deserialize(req.session.handler,[ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking]);
            var re = handler.verifyCustomer(req.body.CustomerDetail);
            req.session.handler = ESSerializer.serialize(handler);
            re.isCust.then((response)=>{
                if(response.length==0)
                {
                    var register = handler.registerCustomer(req.body.CustomerDetail);
                    register.then((customer)=>{
                        req.session.customer = customer;
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({isBlackList:false,isCustomer:true,customer:customer});
                    });
                }
                else
                {
                    re.isBlacked.then((black)=>{
                        if(black.length!=0){
                            res.statusCode = 501;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({isBlackList:true,isCustomer:true,customer:response[0]});
                        }
                        else{
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({isBlackList:false,isCustomer:true,customer:response[0]});
                        }
                    })
                }
            });
        }
        else
        {
            res.statusCode=401;
            res.json({status:false,error:'unauthorized'});
        }
        
    });
Router.route('/initiate')
    .post(function(req,res,next)
    {
        if(req.session.login=='LOGGED IN' & req.session.acess=='Manager')
        {
            ESSerializer.deserialize(req.session.handler,[ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking]);
            handler.initiateBooking(req.body.customerId);
            req.session.handler = ESSerializer.serialize(handler);
            res.send('Set');
        }
        else
        {
            res.statusCode=401;
            res.json({status:false,error:'unauthorized'});
        }
    });
Router.route('/setProduct')
    .post( async function(req,res,next)
    {
        if(req.session.login=='LOGGED IN' & req.session.acess=='Manager')
        {
            ESSerializer.deserialize(req.session.handler,[ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking]);
            var x = await handler.setBooking(req.body.pid,req.body.quantity,req.body.days);
            req.session.handler = ESSerializer.serialize(handler);
            res.json(x.status);
        }
        else
        {
            res.statusCode=401;
            res.json({status:false,error:'unauthorized'});
        }
    });
Router.route('/confirm')
    .post(async function(req,res,next){
        if(req.session.login=='LOGGED IN' & req.session.acess=='Manager')
        {
            ESSerializer.deserialize(req.session.handler,[ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking]);
            var status = await handler.confirmBooking();
            req.session.handler = ESSerializer.serialize(handler);
            res.json(status);
        }
        else
        {
            res.statusCode=401;
            res.json({status:false,error:'unauthorized'});
        }
    });
Router.route('/generateChallan')
    .post(function(req,res,next)
    {
        if(req.session.login=='LOGGED IN' & req.session.acess=='Manager')
        {
            ESSerializer.deserialize(req.session.handler,[ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking]);
            req.session.handler = ESSerializer.serialize(handler);
            res.json(handler.Booking.Challan);
        }
        else
        {
            res.statusCode=401;
            res.json({status:false,error:'unauthorized'});
        }
    });
Router.route('/generateReceipt')
    .post(function(req,res,next){
        if(req.session.login=='LOGGED IN' & req.session.acess=='Manager')
        {
            ESSerializer.deserialize(req.session.handler,[ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking]);
            req.session.handler = ESSerializer.serialize(handler);
            res.json(handler.Booking.Receipt);
        }
        else
        {
            res.statusCode=401;
            res.json({status:false,error:'unauthorized'});
        }
    });
module.exports = Router;