const mongoose = require('mongoose');

//Password Schema
const passwordSchema = mongoose.Schema({
    secretname: {type: String},
    secretusername: {type: String},
    secretpassword: {type: String},
    secretcreatedate: {type: Date, default: Date.now},
    usernamepasswordexpirydate: {type: Date}
});

//Define and Export Customer
module.exports = mongoose.model('Password',passwordSchema);