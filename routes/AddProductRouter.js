var express = require('express');
const ESSerializer = require('esserializer');
var ProductDescript = require('../models/ProductDescription');
const { MongoDB,AddProductHandler,ProductDescription,Product,PersistenceHandler,PeristenceFactory } = require('./classes/class');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Store } = require('express-session');
var Router = express.Router();
Router.route('/initiate')
    .post(function(req,res,next){
        var handler = new AddProductHandler();
        handler.initiateAddProduct();
        req.session.handler = ESSerializer.serialize(handler);
        res.send('Initiate');
    });
Router.route('/set')
    .post(function(req,res,next)
    {
        var handler = ESSerializer.deserialize(req.session.handler,[AddProductHandler,ProductDescription,Product,PersistenceHandler,PeristenceFactory,MongoDB]);
        handler.setProductDetails(req.body.Quantity,req.body.Description);
        req.session.handler = ESSerializer.serialize(handler);
        res.send('Set');
    });
Router.route('/confirm')
    .post(function(req,res,next)
    {
        var handler = ESSerializer.deserialize(req.session.handler,[AddProductHandler,ProductDescription,Product,PersistenceHandler,PeristenceFactory,MongoDB]);
        var data = handler.confirmAddProduct();
        data.then((msg)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(msg);
        })
    });
module.exports = Router;