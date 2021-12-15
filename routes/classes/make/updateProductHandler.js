var Product = require('./Product');
var ProductDescription = require('./ProductDescription');
class updateProductHandler{
    constructor(){

    }
    verifyProduct(id){

    }
    initiateProductUpdate(id){
        this.Product = new Product();
        this.Product.initiate();
        this.Product.setProduct(id);
        this.Product.getProductDescription();
    }
    incrementQuanityBy(n){

    }
    decrementProductQuantityBy(n){

    }
    setAvailability(status){

    }
    setDescription(description){

    }
}
module.exports = updateProductHandler;