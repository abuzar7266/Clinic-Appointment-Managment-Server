var express = require('express');
const { Store } = require('./classes/classes');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { session } = require('passport');
var Router = express.Router();
Router.use(bodyParser.json());
Router.route('/verifyCustomer')
    .post(function(req,res,next){
        
    });
Router.route('/initiateBooking')
    .post(function(req,res,next){
        
    });
Router.route('/setProduct')
    .post(function(req,res,next){
        
    });
Router.route('/confirmBooking')
    .post(function(req,res,next){
        
    });
Router.route('/generateChallan')
    .post(function(req,res,next){
        
    });
Router.route('/generateReceipt')
    .post(function(req,res,next){
        
    });
module.exports = Router;