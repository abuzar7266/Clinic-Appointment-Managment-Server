var express = require('express');
const ESSerializer = require('esserializer');
const { ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking } = require('./classes/class');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Router = express.Router();
Router.route('/all')
    .post(async function(req,res,next){
        if(req.session.login=='LOGGED IN' & req.session.access=='Manager')
        {
            var handler = ESSerializer.deserialize(req.session.handler,[ProductCatalogue,Return,RentReceipt,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking]);
            var response = await handler.getComplaintList();
            req.session.handler = ESSerializer.serialize(handler);
            res.json(response);
        }
        else
        {
            res.statusCode=401;
            res.json({status:false,error:'unauthorized'});
        }
    });
module.exports = Router;