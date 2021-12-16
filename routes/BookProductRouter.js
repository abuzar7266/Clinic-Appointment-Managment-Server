var express = require('express');
const { Store } = require('./classes/classes');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { session } = require('passport');
var Router = express.Router();
Router.use(bodyParser.json());
Router.route('/verifyCustomer')
    .post(function(req,res,next){
        let msg = req.session.store.verifyCustomer(req.CNIC);
        msg.then((response)=>{
                req.session.customer = response;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/halt')
    .post(function(req,res,next){

    });
Router.route('/initiateBooking')
    .post(function(req,res,next){
        const msg = req.session.store.initiateBooking(req.session.customer.CNIC);
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/setProduct')
    .post(function(req,res,next){
        const msg = req.session.store.setBookingProduct(req.body.productID);
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/confirmBooking')
    .post(function(req,res,next){
        const msg = req.session.store.confirmBooking();
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/generateChallan')
    .post(function(req,res,next){
        const msg = req.session.store.generateChallan();
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/generateReceipt')
    .post(function(req,res,next){
        req.session.customer = null;
        const msg = req.session.store.generateReceipt();
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
module.exports = Router;