var express = require('express');
const { Store } = require('./classes/classes');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { session } = require('passport');
var Router = express.Router();
Router.use(bodyParser.json());
Router.route('/verifyRentReceipt')
    .post(function(req,res,next){
        let msg = req.session.store.verifyRentReceipt(req.body.receiptID);
        msg.then((response)=>{
                req.session.receipt = response;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/verifyRented')
    .post(function(req,res,next){
        let msg = req.session.store.verifyRented(req.body.rentID);
        msg.then((response)=>{
                req.session.rented = response;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/initiateReturn')
    .post(function(req,res,next){
        let msg = req.session.store.initiateRentReturn(req.session.receipt.receiptID,req.session.rented.rentID);
        msg.then((response)=>{
                req.session.receipt = response;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/enterProduct')
    .post(function(req,res,next){
        let msg = req.session.store.enterProductID(req.body.productID);
        msg.then((response)=>{
                req.session.receipt = response;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/confirmReturn')
    .post(function(req,res,next){
        let msg = req.session.store.confirmReturn();
        msg.then((response)=>{
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/generateChallan')
    .post(function(req,res,next){
        let msg = req.session.store.generateChallan();
        msg.then((response)=>{
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/generateReceipt')
    .post(function(req,res,next){
        let msg = req.session.store.generateReceipt();
        msg.then((response)=>{
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
module.exports = Router;