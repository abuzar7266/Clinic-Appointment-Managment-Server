var express = require('express');
const ESSerializer = require('esserializer');
const { ProductCatalogue,RentReceipt,Return,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PeristenceFactory,Booking } = require('./classes/class');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Router = express.Router();
Router.route('/availableProducts')
    .get(async function(req,res,next){
        var handler = new Store();
        var response = await handler.getProductCatalogue();
        res.json(response);
    });
module.exports = Router;