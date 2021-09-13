const cp = require('child_process');
const Password = require('./models/audit');

//get the username logged in
const user = 'mokones'
const addUser = (user) => {
    Useraudit.create(user).then(user => {
        console.info('New User Audit info Saved....');
        user;
        mongoose.connection.close();
    });
}