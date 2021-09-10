const mongoose = require('mongoose');


//Password Schema
const passwordSchema = mongoose.Schema({
    secretname: {type: String},
    secretusername: {type: String},
    oldsecretpassword: {type: String},
    newsecretpassword: {type: String},
    secretlastupdatedate: {type: Date, default: Date.now},
    passwordexpirydate: {type: Date}
    
});


//Define and Export Customer
module.exports = mongoose.model('Password',passwordSchema);