var express = require('express');
const ESSerializer = require('esserializer');
var ProductDescript = require('../models/ProductDescription');
const { Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PeristenceFactory,Booking } = require('./classes/class');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Router = express.Router();
Router.route('/verifyCustomer')
    .post(function(req,res,next){
        var handler = new Store();
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
    });
Router.route('/initiate')
    .post(function(req,res,next)
    {
        var handler = new Store();//ESSerializer.deserialize(req.session.handler,[Blacklist,Customer,Booking,Store,ProductDescription,Product,PersistenceHandler,PeristenceFactory,MongoDB]);
        handler.initiateBooking(req.body.customerId);
        req.session.handler = ESSerializer.serialize(handler);
        res.send('Set');
    });
Router.route('/setProduct')
    .post( async function(req,res,next)
    {
        var handler = ESSerializer.deserialize(req.session.handler,[Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PeristenceFactory,Booking]);
        var x = await handler.setBooking(req.body.pid,req.body.quantity,req.body.days);
        req.session.handler = ESSerializer.serialize(handler);
        res.send('Hi');
    });
Router.route('/confirm')
    .post(async function(req,res,next){
        var handler = ESSerializer.deserialize(req.session.handler,[Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PeristenceFactory,Booking]);
        await handler.confirmBooking();
        req.session.handler = ESSerializer.serialize(handler);
        res.send('Hi');
    });
Router.route('/generateChallan')
    .post(function(req,res,next){
        var handler = ESSerializer.deserialize(req.session.handler,[Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PeristenceFactory,Booking]);
        req.session.handler = ESSerializer.serialize(handler);
        res.json(handler.Booking.Challan);
    });
Router.route('/generateReceipt')
    .post(function(req,res,next){
        var handler = ESSerializer.deserialize(req.session.handler,[Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PeristenceFactory,Booking]);
        req.session.handler = ESSerializer.serialize(handler);
        res.json(handler.Booking.Receipt)
    });
module.exports = Router;