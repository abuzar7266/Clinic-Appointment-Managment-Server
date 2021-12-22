var express = require('express');
const ESSerializer = require('esserializer');
const { MongoDB,Store,ProductDescription,Product,PersistenceHandler,PeristenceFactory } = require('./classes/class');
var mongoose = require('mongoose');
var ProductDescript = require('../models/ProductDescription');
const bodyParser = require('body-parser');
var Router = express.Router();
Router.route('/verify')
    .get(function(req,res,next){
        var handler = new Store();
        var x = handler.verifyProductAvailability(req.body.ProductId);
        req.session.handler = ESSerializer.serialize(handler);
        x.res.then((msg1)=>{
            x.res2.then((msg2)=>{
                res.setHeader('Content-Type', 'application/json');
                res.json({Product:msg1,Description:msg2});
            });
        });
    });
Router.route('/confirm')
    .get(function(req,res,next){
        var handler = ESSerializer.deserialize(req.session.handler,[Store,ProductDescription,Product,PersistenceHandler,PeristenceFactory,MongoDB]);
        handler.removeProduct(req.body.ProductId);
        req.session.handler = null;
        res.send('Hi');
    });
module.exports = Router;