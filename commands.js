#! /usr/bin/env node
const program = require('commander');
const {prompt} = require('inquirer');
const { version } = require('mongoose');
const{
    addSecret,
    findSecret,
    updateSecret,
    removeSecret,
    listSecret
} = require('./index');

//Secret File Questions
const questions = [
    {
        type:'input',
        name:'secretname',
        message: 'Secret Name'
    },
    {
        type:'input',
        name:'secretusername',
        message: 'Secret Username '
    },
    {
        type:'input',
        name:'secretpassword',
        message: 'Secret username Password'
    },
    {
        type:'input',
        name:'secretcreatedate',
        message: 'Secret Created Date'
    }, 
    {
        type:'input',
        name:'usernamepasswordexpirydate',
        message: 'Password Expiry Date'
    }

];

//Add Command
program
    .command('add')
    .alias('a')
    .description('Add a secret')
    .action(() => {
        prompt(questions).then(answers => addSecret(answers));
    });

//Find Command
program
    .command('find <secretusername>')
    .alias('f')
    .description('Find a secret')
    .action(secretusername => findSecret(secretusername));


//Update Command
program
    .command('update <_id>')
    .alias('u')
    .description('Update a secret')
    .action(_id => {
        prompt(questions).then(answers => updateSecret(_id,answers));
    });

//Remove Command
program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a secret')
    .action(_id => removeSecret(_id));

//List Command
program
    .command('list')
    .alias('l')
    .description('List all secrets')
    .action(() => listSecret());

program
    .version('1.0.0')
    .description('Password Management System')

program.parse(process.argv);