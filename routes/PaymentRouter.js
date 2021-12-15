var express = require('express');
const { Store } = require('./classes/classes');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { session } = require('passport');
var Router = express.Router();
Router.use(bodyParser.json());
Router.route('/verifyChallan')
    .post(function(req,res,next){
        
    });
Router.route('/initiatePayment')
    .post(function(req,res,next){
        
    });
Router.route('/setAmountPaid')
    .post(function(req,res,next){
        
    });
Router.route('/confirmPayment')
    .post(function(req,res,next){
        
    });
Router.route('/generateReceipt')
    .post(function(req,res,next){
        
    });
module.exports = Router;