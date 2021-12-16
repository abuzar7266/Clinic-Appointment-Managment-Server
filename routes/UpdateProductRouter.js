var express = require('express');
const { Store } = require('./classes/classes');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { session } = require('passport');
var Router = express.Router();
Router.use(bodyParser.json());
Router.route('/verifyProduct')
    .post(function(req,res,next){
        let msg = req.session.store.verifyProduct(req.body.productID);
        msg.then((response)=>{
                req.session.product = response;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/initiateUpdateProduct')
    .post(function(req,res,next){
        let msg = req.session.store.initiateUpdateProduct(req.session.product);
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/setProduct')
    .post(function(req,res,next){
        let msg = req.session.store.setProduct(req.body.productDetails);
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/setProductDescription')
    .post(function(req,res,next){
        let msg = req.session.store.setProductDescription(req.body.productDescription);
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/confirmUpdateProduct')
    .post(function(req,res,next){
        let msg = req.session.store.confirmAddProduct();
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
module.exports = Router;