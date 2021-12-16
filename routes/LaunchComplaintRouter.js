var express = require('express');
const { Store } = require('./classes/classes');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { session } = require('passport');
var Router = express.Router();
Router.use(bodyParser.json());
Router.route('/verifyReceipt')
    .post(function(req,res,next){
        let msg = req.session.store.verifyReceipt(req.body.receiptID);
        msg.then((response)=>{
                req.session.receipt = response;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        }); 
    });
Router.route('/initiateCompplaint')
    .post(function(req,res,next){
        let msg = req.session.store.initiateComplaint(req.session.receipt.receiptID);
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/setComplaint')
.post(function(req,res,next){
    let msg = req.session.store.setComplaintDetails(req.body.subject,req.body.complaintText);
    msg.then((response)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
    });
});
Router.route('/confirmComplaint')
    .post(function(req,res,next)
    {
        let msg = req.session.store.confirmLaunchComplaint();
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
Router.route('/generateReceipt')
    .post(function(req,res,next){
        let msg = req.session.store.generateComplaintReceipt();
        msg.then((response)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
        });
    });
module.exports = Router;