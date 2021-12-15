var express = require('express');
const { Store } = require('./classes/classes');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { session } = require('passport');
var Router = express.Router();
Router.use(bodyParser.json());
Router.route('/verifyProduct')
    .post(function(req,res,next){
        
    });
Router.route('/initiateUpdate')
    .post(function(req,res,next){
        
    });
Router.route('/setProduct')
    .post(function(req,res,next){
        
    });
Router.route('/setProductDescription')
    .post(function(req,res,next){
        
    });
Router.route('/confirmUpdate')
    .post(function(req,res,next){
        
    });
module.exports = Router;