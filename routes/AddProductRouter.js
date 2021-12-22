var express = require('express');
const ESSerializer = require('esserializer');
var ProductDescript = require('../models/ProductDescription');
const { MongoDB,Store,ProductDescription,Product,PersistenceHandler,PeristenceFactory } = require('./classes/class');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Router = express.Router();
Router.route('/initiate')
    .post(function(req,res,next){
        var handler = new Store();
        handler.initiateAddProduct();
        req.session.handler = ESSerializer.serialize(handler);
        res.send('Initiate');
    });
Router.route('/set')
    .post(function(req,res,next)
    {
        var handler = ESSerializer.deserialize(req.session.handler,[Store,ProductDescription,Product,PersistenceHandler,PeristenceFactory,MongoDB]);
        handler.setProductDetails(req.body.Quantity,req.body.Description);
        req.session.handler = ESSerializer.serialize(handler);
        res.send('Set');
    });
Router.route('/confirm')
    .post(function(req,res,next)
    {
        var handler = ESSerializer.deserialize(req.session.handler,[Store,ProductDescription,Product,PersistenceHandler,PeristenceFactory,MongoDB]);
        var data = handler.confirmAddProduct();
        data.then((msg)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(msg);
        })
    });
module.exports = Router;