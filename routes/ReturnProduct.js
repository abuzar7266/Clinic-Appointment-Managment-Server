var express = require('express');
const ESSerializer = require('esserializer');
const { ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking } = require('./classes/class');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Router = express.Router(); 
Router.route('/verify')
    .post(async function(req,res,next){
        if(req.session.login=='LOGGED IN' & req.session.access=='Manager')
        {
            var handler = ESSerializer.deserialize(req.session.handler,[ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking]);
            var response = await handler.verifyRent(req.body.id);
            req.session.verifiedRent = response;
            req.session.handler = ESSerializer.serialize(handler);
            res.json(response);
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
        if(req.session.login=='LOGGED IN' & req.session.access=='Manager')
        {
            var handler = ESSerializer.deserialize(req.session.handler,[ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking]);
            if(req.session.verifiedRent.Status=='CLOSED')
            {
                handler.initiateReturn(String(req.session.verifiedRent._id),req.session.verifiedRent.BookingID,req.session.verifiedRent.ProductID,req.session.verifiedRent.Quantity,req.session.verifiedRent.ReturnDate);
                req.session.handler = ESSerializer.serialize(handler);
                res.json({status:true});
            }
            else
            {
                req.session.handler = ESSerializer.serialize(handler);
                res.json({status:false,error:'Product Returned or not Rented'});
            }
        }
        else
        {
            res.statusCode=401;
            res.json({status:false,error:'unauthorized'});
        }
    });
Router.route('/confirm')
    .post(async function(req,res,next)
    {
        if(req.session.login=='LOGGED IN' & req.session.access=='Manager')
        {
            var handler = ESSerializer.deserialize(req.session.handler,[ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking]);
            var status = await handler.confirmReturn();
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
        if(req.session.login=='LOGGED IN' & req.session.access=='Manager')
        {
            var handler = ESSerializer.deserialize(req.session.handler,[ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking]);
            var status = handler.generateReturnChallan();
            req.session.handler = ESSerializer.serialize(handler);
            res.json(status);
        }
        else
        {
            res.statusCode=401;
            res.json({status:false,error:'unauthorized'});
        }
    });
Router.route('/generateReceipt')
    .post(function(req,res,next)
    {
        if(req.session.login=='LOGGED IN' & req.session.access=='Manager')
        {
            var handler = ESSerializer.deserialize(req.session.handler,[ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking]);
            var status = handler.generateReturnReceipt();
            req.session.handler = ESSerializer.serialize(handler);
            res.json(status);
        }
        else
        {
            res.statusCode=401;
            res.json({status:false,error:'unauthorized'});
        }
    });
module.exports = Router; 