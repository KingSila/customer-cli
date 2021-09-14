const mongoose = require('mongoose');


//Password Schema
const passwordSchema = mongoose.Schema({
    secretname: {type: String},
    secretusername: {type: String},
    oldsecretpassword: {type: String},
    newsecretpassword: {type: String},
    passwordexpirydate: {type: Date}
},
    {timestamps: true}
);


//Define and Export Customer
module.exports = mongoose.model('Password',passwordSchema);