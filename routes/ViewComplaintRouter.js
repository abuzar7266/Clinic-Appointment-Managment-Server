var express = require('express');
const ESSerializer = require('esserializer');
const { ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PeristenceFactory,Booking } = require('./classes/class');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Router = express.Router();
Router.route('/all')
    .post(async function(req,res,next){
        var handler = new Store();
        var response = await handler.getComplaintList();
        req.session.handler = ESSerializer.serialize(handler);
        res.json(response);
    });
module.exports = Router;