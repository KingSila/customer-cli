#! /usr/bin/env node
const program = require('commander');
const {prompt} = require('inquirer');
const { version } = require('mongoose');
const{
    addSecret,
    findSecret,
    updateSecret,
    removeSecret,
    listSecret,
    addSecretUsage,
    findSecretUsage,
    updateSecretUsage,
    removeSecretUsage
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
        name:'oldsecretpassword',
        message: 'Previous Secret  Password'
    },
    {
        type:'input',
        name:'newsecretpassword',
        message: 'New Secret  Password'
    },
    {
        type:'input',
        name:'secretlastupdatedate',
        message: 'Secret Last Update Date'
    }, 
    {
        type:'input',
        name:'passwordexpirydate',
        message: 'Password Expiry Date'
    },
    {
        type:'input',
        name:'lastuserupdated',
        message: 'User'
    }

];

// Secret usage questions
const usagequestions = [
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
        name:'microservice1',
        message: 'microservice1'
    },
    {
        type:'input',
        name:'microservice2',
        message: 'microservice2'
    },
    {
        type:'input',
        name:'microservice3',
        message: 'microservice3'
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

    //Add Command for secret usage
program
.command('addusage')
.alias('au')
.description('Add a secret usage')
.action(() => {
    prompt(usagequestions).then(answers => addSecretUsage(answers));
});


//Find Command for secret usage
program
    .command('findusage <secretname>')
    .alias('fu')
    .description('Find a secret usage')
    .action(secretname => findSecretUsage(secretname));

//Update Command for secret usage
program
    .command('updateusage <_id>')
    .alias('uu')
    .description('Update a secret usage')
    .action(_id => {
        prompt(usagequestions).then(answers => updateSecretUsage(_id,answers));
    });


//Remove Command for secret usage
program
    .command('removeusage <_id>')
    .alias('ru')
    .description('Remove a secret usage')
    .action(_id => removeSecretUsage(_id));


program
    .version('1.0.0')
    .description('Password Management System')

program.parse(process.argv);