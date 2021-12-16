var express = require('express');
const { Store } = require('./classes/classes');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { session } = require('passport');
var Router = express.Router();
Router.use(bodyParser.json());
Router.route('/verifyChallan')
    .post(function(req,res,next){
        let msg = req.session.store.verifyChallan(req.body.challanID);
        msg.then((response)=>{
                req.session.challan = response;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        }); 
    });
Router.route('/initiatePayment')
    .post(function(req,res,next){
        let msg = req.session.store.initiatePayment(req.session.challan.challanID);
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        }); 
    });
Router.route('/setAmountPaid')
    .post(function(req,res,next){
        let msg = req.session.store.setAmountPaid(req.body.AmountPaid);
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        }); 
    });
Router.route('/confirmPayment')
    .post(function(req,res,next){
        let msg = req.session.store.confirmPayment();
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        }); 
    });
Router.route('/generatePaymentReceipt')
    .post(function(req,res,next){
        let msg = req.session.store.generatePaymentReceipt();
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
module.exports = Router;