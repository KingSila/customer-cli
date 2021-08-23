const mongoose = require('mongoose');

//Map global promise  - get rid of warning

mongoose.Promise = global.Promise;
//Connect to db
const db = mongoose.connect('mongodb://localhost:27017/customercli',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//Import Model

const Customer = require('./models/Customer');

//Add Customer
const addCustomer = (customer) => {
    Customer.create(customer).then(customer => {
        console.info('New Customer Added');
        mongoose.connection.close();
    });

}


//Find Customer

const findCustomer = (name) => {
    //Make case insensitive
    const search = new RegExp(name,'i');
    Customer.find({$or: [{firstname: search},{lastname: search}]})
    .then(customer => {
        console.info(customer);
        console.info(`${customer.length} matches`);
        mongoose.connection.close();
    });
}

//Export All Methods

module.exports = {
    addCustomer,
    findCustomer
}