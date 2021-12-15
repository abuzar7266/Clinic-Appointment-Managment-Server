class Customer
{
    constructor()
    {
        
    }
    setCustomer(name,nationaility,city,street,postalCode,dateOfBirth,cnic,phoneNo,status){
        this.id = "";
        this.name = name;
        this.nationaility = nationaility;
        this.city = city;
        this.street = street;
        this.postalCode = postalCode;
        this.dateOfBirth = dateOfBirth;
        this.cnic = cnic;
        this.phoneNo = phoneNo;
        this.status = status;
    }
    getCustomer(cnic){
        let response = null;
        this.id = response.id;
        this.name = response.name;
        this.nationaility = response.nationaility;
        this.city = response.city;
        this.street = response.street;
        this.postalCode = response.postalCode;
        this.dateOfBirth = response.dateOfBirth;
        this.cnic = response.cnic;
        this.phoneNo = response.phoneNo;
        this.status = response.status;
    }
    getName(){
        return this.name;
    }
    storeCustomer(){
        //store and return id;
    }
};
module.exports = Customer;