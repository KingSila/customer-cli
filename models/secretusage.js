const mongoose = require('mongoose');

//Password Schema
const secretusageSchema = mongoose.Schema({
    secretname: {type: String},
    microservices:{type: Object},
    lastuserupdated:{type: String}
});

//Define and Export Customer
module.exports = mongoose.model('SecretUsage',secretusageSchema);