var express = require('express');
const ESSerializer = require('esserializer');
const { ProductCatalogue,Return,ReturnReceipt,Rent,PaymentReceipt,Ledger,Payment,ComplaintReceipt,Complaint,Receipt,BookingReceipt,BookingChallan,Challan,FineChallan,Blacklist,Customer,MongoDB,Store,ProductDescription,Product,PersistenceHandler,PersistenceFactory,Booking } = require('./classes/class');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Router = express.Router();
Router.route('/login')
    .post(async function(req,res,next){
        if(req.session.login!='LOGGED IN'){
            var handler = new Store();
            var response = await handler.Login(req.body.username,req.body.password);
            req.session.handler = ESSerializer.serialize(handler);
            if(response)
            {
                req.session.login = 'LOGGED IN';
                req.session.userid = String(response._id);
                req.session.access = response.Job_Title;
                console.log(req.session.access);
                req.session.username = response.username;
                res.statusCode = 200;
                res.json({status:true,session:response});
            }
            else
            {
                res.statusCode = 404;
                res.json({status:false,error:'incorrect username or password'});
            }
        }
        else{
            res.statusCode = 301;
            res.json({status:false,error:'user is logged in'});
        }
    });
Router.route('/logout')
    .post(async function(req,res,next){
        if(req.session.login=='LOGGED IN'){
            req.session.handler = null;
            req.session.login = null;
            res.statusCode = 200;
            res.json({status:true});
        }
        else{
            res.statusCode = 404;
            res.json({status:false,error:'no login found'});
        }
    });
module.exports = Router;