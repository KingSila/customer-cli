const mongoose = require('mongoose');

//Password Schema
const secretusageSchema = mongoose.Schema({
    secretname: {type: String},
    secretusername: {type: String},
    microservice1: {type: String},
    microservice2: {type: String},
    microservice3: {type: String},
    lastuserupdated:{type: String}
});

//Define and Export Customer
module.exports = mongoose.model('SecretUsage',secretusageSchema);