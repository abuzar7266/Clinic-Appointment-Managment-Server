var express = require('express');
const { Store } = require('./classes/classes');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { session } = require('passport');
var Router = express.Router();
Router.use(bodyParser.json());
Router.route('/verifyReceipt')
    .post(function(req,res,next){
        
    });
Router.route('/initiateReturn')
    .post(function(req,res,next){
        
    });
Router.route('/enterProduct')
    .post(function(req,res,next){
        
    });
Router.route('/confirmReturn')
    .post(function(req,res,next){
        
    });
Router.route('/generateChallan')
    .post(function(req,res,next){
        
    });
Router.route('/generateReceipt')
    .post(function(req,res,next){
        
    });
module.exports = Router;