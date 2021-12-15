var Customer = require('./Customer');
class Defaulter{
    constructor()
    {

    }
    getDefaulter(defaulterDate,CustomerDetail){
        const res = CustomerDetail;
        this.Customer = new Customer();
        this.Customer.setCustomer(res.name,res.nationaility,res.city,res.street,res.postalCode,res.dateOfBirth,res.cnic,res.phoneNo,res.status)
        this.defaultedDate = defaulterDate;
    }
    isDefaulter(Cnic){
        //search in list and return status
    }
}
module.exports = Defaulter;
