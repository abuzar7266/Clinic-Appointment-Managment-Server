var express = require('express');
const ESSerializer = require('esserializer');
const { Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PeristenceFactory,Booking } = require('./classes/class');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Router = express.Router();
Router.route('/verify')
    .post(async function(req,res,next){
        var handler = new Store();
        var response = await handler.verifyReceipt(req.body.id);
        req.session.receiptVerifiable = response;
        req.session.handler = ESSerializer.serialize(handler);
        res.json(response);
    });
Router.route('/initiate')
    .post(function(req,res,next){
        var handler = ESSerializer.deserialize(req.session.handler,[Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PeristenceFactory,Booking]);
        handler.initiateLaunchComplaint(req.body.id);
        req.session.handler = ESSerializer.serialize(handler);
        res.send('Initiated');
    });
Router.route('/set')
    .post(function(req,res,next){
        var handler = ESSerializer.deserialize(req.session.handler,[Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PeristenceFactory,Booking]);
        handler.setNewComplaint(req.body.subject,req.body.complaint);
        req.session.handler = ESSerializer.serialize(handler);
        res.send('Complaint Prepared');
    });
Router.route('/confirm')
    .post(async function(req,res,next){
        var handler = ESSerializer.deserialize(req.session.handler,[Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PeristenceFactory,Booking]);
        var response = await handler.SubmitNewComplaint();
        req.session.handler = ESSerializer.serialize(handler);
        res.json(response);
    });
module.exports = Router;