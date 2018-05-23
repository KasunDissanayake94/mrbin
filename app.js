
const express  = require('express');
const path =  require("path");
const user = require('./routes/users');
//const mongoose =require('mongoose');
const config = require('./config/database');
//Convert html body to json
const bodyParser = require('body-parser');
const cors = require('cors');





//Create the connection
/*const connection = mongoose.connect(config.database);
if (connection){
    console.log("Database Connected...");
}else{
    console.log("Database not Connected");
}*/


const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());
//Static Files
app.use(express.static(path.join(__dirname,"public")));

app.use('/',user);


app.listen(3000,function () {
    console.log("Listen to the port");
});

//Dynamically Pass data here
var spawn = require("child_process").spawn;
var quality = 4;
var service = 6;
var dir = spawn('python', ['fuzzytest.py',quality,service]);

dir.stdout.on("data", function(data) {
    console.log('stdout: ' + data);
});

dir.stderr.on('data', function (data) {
    //throw errors
    console.log('stderr: ' + data);
});

dir.on('close', function (code) {
    console.log('child process exited with code ' + code);
});