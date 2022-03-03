const { createLogger, format, transports } = require('winston');
require('winston-mongodb');
const { combine, timestamp, printf } = format;
const mongoose = require('mongoose');
let db = '';

// //Map global promise  - get rid of warning
// mongoose.Promise = global.Promise;
// //Connect to db
//   db = mongoose.connect('mongodb://localhost:27017/passwordcli',{
//      useNewUrlParser: true,
//      useUnifiedTopology: true
    
// });

// console.log("the connected database is " + db);

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp}  ${level}: ${message}`;
  });

const userauditLogger = () => {
    return createLogger({
        level: 'info',
        format: combine(
            timestamp(),myFormat
        ),
        //defaultMeta: { service: 'user-service' },
        // transports: [new transports.Console(),
            transports: [new transports.File({filename: 'myErrors.log'}), 
        new transports.MongoDB({
            level: 'info',
            db:'mongodb://localhost:27017/passwordcli',
            options:{
                useUnifiedTopology: true,
                useNewUrlParser: true
            },
            collection: 'useraudit',
            format: combine(
                timestamp(),myFormat
            ),
            })
    ],
    
    }); 


};


module.exports = userauditLogger;