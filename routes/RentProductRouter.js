var express = require('express');
const { Store } = require('./classes/classes');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { session } = require('passport');
var Router = express.Router();
Router.use(bodyParser.json());
Router.route('/verifyBookingReceipt')
    .post(function(req,res,next){
        
    });
Router.route('/verifyPaymentReceipt')
    .post(function(req,res,next){
        
    });
Router.route('/initiateRent')
    .post(function(req,res,next){
        
    });
Router.route('/confirmRent')
    .post(function(req,res,next){
        
    });
Router.route('/generateReceipt')
    .post(function(req,res,next){
        
    });
module.exports = Router;