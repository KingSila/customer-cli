const exec = require('child_process').exec;
const myShellScript = exec('passwordApply.sh /myDir');
myShellScript.stdout.on('data', (data)=>{
    console.info(data); 
    // do whatever you want here with data
});
myShellScript.stderr.on('data', (data)=>{
    console.error(data);
});