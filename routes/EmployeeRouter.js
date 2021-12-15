var express = require('express');
const { Store,Employee } = require('./classes/classes');
var Document = require('../models/Employee');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { session } = require('passport');
var Router = express.Router();
Router.use(bodyParser.json());
/*Router.route('/register')
    .post(function(req,res,next){
        var C = new Employee();
        C.setEmployee('zakee123','zakee123','3410188757892','Zakee Qureshi','Cashier','24/04/1998');
        Document.create(C)
                .then((msg) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(msg);
                }, (err) => next(err))
                .catch((err) => next(err));
    });
*/
Router.route('/login')
    .post(function(req,res,next)
    {
            req.session.store = new Store();
            var resp = req.session.store.Login(req.body.username,req.body.password);
            resp.then((msg)=>{
                req.session.Employee = msg;
                res.setHeader('Content-Type', 'application/json');
                res.json({login:"Done",msg});
            })
    });
Router.route('/checkLogin')
    .get(function(req,res,next){
            if(req.session.store){ 
                res.statusCode = 200;
                res.send('login now');
            }
            else{
                res.statusCode = 400;
                res.send('not login now');
            }
    });
Router.route('/logout')
    .post(function(req,res,next){
        if(req.session.store){
            req.session.store = null;
            res.statusCode = 200;
            res.send('logged out');
        }
        else{
            res.statusCode = 404;
            res.send('Session does not exist');
        }
    });
Router.route('/current')
    .get(function(req,res,next){
        if(req.session.store){
            var X = req.session.Employee;
            console.log(req.session.store.StoreNo);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(X);
        }
        else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({error:'Session does not exist',status:404});
        }
    });
module.exports = Router;