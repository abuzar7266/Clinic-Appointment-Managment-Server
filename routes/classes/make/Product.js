var ProductDescription = require('./ProductDescription');
class Product{
    constructor(){

    }
    setProduct(productId,quanity){
        this.productId = productId;
        this.quanity = quanity;
        this.productDescription = null;
    }
    setProductDescription(description){
        this.productDescription = new ProductDescription();
    }
    getProductDescription(){
        return this.productDescription;
    }
    addProduct(){
        //store product by db handler
    }
    updateProduct(updatedProduct){
        //updateProduct from db handler
    }
    updateProductDescription(description){
        //reload the description
        //store in description
        //update description
    }
}
module.exports = Product;