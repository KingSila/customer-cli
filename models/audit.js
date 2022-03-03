const mongoose = require('mongoose');

//Password Schema
const userauditSchema = mongoose.Schema({
    secretname: {type: String},
    lastuserupdated:{type: String}
});

//Define and Export Customer
module.exports = mongoose.model('Useraudit',userauditSchema);