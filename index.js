const mongoose = require('mongoose');
const cp = require('child_process');
const  userauditLogger = require('./userauditLogger');
let db ='';
let logger = null;



//Map global promise  - get rid of warning
mongoose.Promise = global.Promise;
//Connect to db
  db = mongoose.connect('mongodb://localhost:27017/passwordcli',{
    useNewUrlParser: true,
    useUnifiedTopology: true
    
});

//Logging
logger = userauditLogger();

//Import Model
const Password = require('./models/Password');
const SecretUsage = require('./models/SecretUsage');
const UserAudit = require('./models/audit');





//Add Secret
async function addSecret(secret)  {
    Password.create(secret).then(secret => {

        //check who logged in
    cp.exec('whoami', (err, stdout, stderr) => {
    logger.info('user: ' + stdout);
    
    if (err) {
        console.info('error: ' + err);
        return
    }
    })
   
        console.info('New Secret Added...saving the data to MONGODB..');
        logger.info('New Secret Added.');
        logger.info('Secret: ' +  secret.secretname);
        mongoose.connection.close();
      
       
    });
   
}

setTimeout(function (){
    console.log("Data persisted to MONGODB I am exiting......." ); 
    process.exit();  
    
},40000);

//Find Secret
const findSecret= (secretname) => {
    //Make case insensitive
    const search = new RegExp(secretname,'i');
    Password.find({$or: [{secretname: search},{secretusername: search}]})
    .then(password => {
        console.info(password);
        console.info(`${password.length} matches`);
        mongoose.connection.close();
      
    });
}

//Update Secret
const updateSecret = (_id, password) => {
    
    Password.updateOne({ _id },password)
    .then(password => {
        console.info('Secret Updated');
        mongoose.connection.close();
        
    })
}

//Remove Secret
const removeSecret = (_id) => {
    Password.deleteOne({_id})
    .then(password => {
        console.info('Secret Removed');
        mongoose.connection.close();
    })
}

//List All Secrets
const listSecret = () => {
    Password.find()
    .then(passwords =>  {
    console.info(passwords);
    console.info(`${passwords.length} secrets`);
    mongoose.connection.close();

    })
}

//Add new secret usage
const addSecretUsage = (secret) => {
    SecretUsage.create(secret).then(secret => {
        console.info('New Secret Usage Added');
        mongoose.connection.close();
    });

}


const findSecretUsage = (secretname) => {
    //Make case insensitive
    const search = new RegExp(secretname,'i');
    SecretUsage.find({$or: [{secretname: search},{secretusername: search}]})
    .then(secretusage => {
        console.info(secretusage);
        console.info(`${secretusage.length} matches`);
        mongoose.connection.close();
    });
}

//Update SecretUsage microservices

const updateSecretUsage = (_id, secretusage) => {
    
    SecretUsage.updateOne({ _id },secretusage)
    .then(secretusage => {
        console.info('Secret Usage Updated');
        mongoose.connection.close();
    })
}

//Remove Secret Usage
const removeSecretUsage = (_id) => {
    SecretUsage.deleteOne({_id})
    .then(secretusage => {
        console.info('Secret Usage Removed');
        mongoose.connection.close();
    })
}


//Export All Methods
module.exports = {
addSecret,
findSecret,
updateSecret,
removeSecret,
listSecret,
addSecretUsage,
findSecretUsage,
updateSecretUsage,
removeSecretUsage,
logger
}