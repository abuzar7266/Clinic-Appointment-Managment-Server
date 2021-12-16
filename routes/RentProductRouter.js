var express = require('express');
const { Store } = require('./classes/classes');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { session } = require('passport');
var Router = express.Router();
Router.use(bodyParser.json());
Router.route('/verifyBookingReceipt')
    .post(function(req,res,next){
        let msg = req.session.store.verifyBooking(req.body.bookingID);
        msg.then((response)=>{
                req.session.challan = response;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/verifyPaymentReceipt')
    .post(function(req,res,next){
        let msg = req.session.store.verifyPaymentReceipt(req.body.receiptID);
        msg.then((response)=>{
                req.session.receipt = response;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/initiateProductRent')
    .post(function(req,res,next){
        let msg = req.session.store.initiateProductRent(req.session.store.bookingID,req.session.receipt.receiptID);
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/confirmProductRented')
    .post(function(req,res,next){
        let msg = req.session.store.confirmProductRented();
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/returnDate')
    .get(function(req,res,next){
        let msg = req.session.store.getReturnDetails();
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/generateRentReceipt')
    .post(function(req,res,next)
    {
        let msg = req.session.store.generateReceipt();
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
module.exports = Router;