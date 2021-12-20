var express = require('express');
const ESSerializer = require('esserializer');
const { MongoDB,UpdateProductHandler,ProductDescription,Product,PersistenceHandler,PeristenceFactory } = require('./classes/class');
var mongoose = require('mongoose');
var ProductDescript = require('../models/ProductDescription');
const bodyParser = require('body-parser');
const { Store } = require('express-session');
var Router = express.Router();
Router.route('/verify')
    .get(function(req,res,next){
        var handler = new UpdateProductHandler();
        var x = handler.verifyProductAvailability(req.body.ProductId);
        req.session.handler = ESSerializer.serialize(handler);
        x.res.then((msg1)=>{
            x.res2.then((msg2)=>{
                res.setHeader('Content-Type', 'application/json');
                res.json({Product:msg1,Description:msg2});
            });
        });
    });
Router.route('/initiate')
    .get(function(req,res,next){
        var handler = ESSerializer.deserialize(req.session.handler,[UpdateProductHandler,ProductDescription,Product,PersistenceHandler,PeristenceFactory,MongoDB]);
        handler.initiateUpdateProduct(req.body.ProductId);
        req.session.handler = ESSerializer.serialize(handler);
        res.statusCode = 200;
        res.send('Hi');
    });
Router.route('/set')
    .get(function(req,res,next){
        var handler = ESSerializer.deserialize(req.session.handler,[UpdateProductHandler,ProductDescription,Product,PersistenceHandler,PeristenceFactory,MongoDB]);
        handler.setProductDetails(req.body.Quantity,req.body.Description);
        req.session.handler = ESSerializer.serialize(handler);
        res.statusCode = 200;
        res.send('Hi');
    });
Router.route('/confirm')
    .get(function(req,res,next){
        var handler = ESSerializer.deserialize(req.session.handler,[UpdateProductHandler,ProductDescription,Product,PersistenceHandler,PeristenceFactory,MongoDB]);
        handler.confirmUpdateProduct();
        req.session.handler = ESSerializer.serialize(handler);
        res.statusCode = 200;
        res.send('Hi');
    });
Router.route('/get')
    .get(function(req,res,next)
    {
        ProductDescript.find({})
        .populate('ProductId')
        .then((msg)=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(msg);
        });
    });
module.exports = Router;