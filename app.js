
const express  = require('express');
const path =  require("path");
const user = require('./routes/users');
//const mongoose =require('mongoose');
const config = require('./config/database');
//Convert html body to json
const bodyParser = require('body-parser');
const cors = require('cors');
const schedule = require('node-schedule');
const firebase = require('firebase');

const x= 9;

var daily_collection = 0;
var monthly_collection = 0;
var annual_collection = 0;
var five_years_back_collection = 120000;
var four_years_back_collection = 200000;
var three_years_back_collection = 345600;
var two_years_back_collection = 366730;
var one_year_back_collection = 704450;


var jan = 22;
var feb = 44;
var mar = 330;
var apr = 220;
var may = 340;
var jun = 560;
var jul = 520;
var aug = 3230;
var sep = 220;
var oct = 660;
var nov = 230;
var dec = 50;

var current_year = 2018;

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

var j = schedule.scheduleJob('59 * * * *', function(){
    console.log('The answer to life, the universe, and everything!');
    daily_script();
    
  });
var date = new Date(current_year, 12, 31, 23, 59, 0);
 //New Year Starts
 //All sets to zero
var p = schedule.scheduleJob(date, function(){
  current_year  =current_year +1;
  jan.feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec = 0;
  one_year_back_collection = annual_collection;
  two_years_back_collection = one_year_back_collection;
  three_years_back_collection = two_years_back_collection;
  four_years_back_collection = three_years_back_collection;
  five_years_back_collection = four_years_back_collection;
  annual_collection = 0;
  daily_collection = 0;
  monthly_collection = 0;
});

//Every Month starts montly collection should renew 
var m = schedule.scheduleJob('1 0 1 1 *', function(){
    jan = 0;
    monthly_collection = 0;
  });
  var m = schedule.scheduleJob('1 0 1 2 *', function(){    
    jan = monthly_collection;
    annual_collection = annual_collection + monthly_collection;
    feb = 0;
    monthly_collection = 0;    
  });
  var m = schedule.scheduleJob('1 0 1 3 *', function(){
    feb = monthly_collection;
    annual_collection = annual_collection + monthly_collection;
    mar = 0;
    monthly_collection = 0;
  });
  var m = schedule.scheduleJob('1 0 1 4 *', function(){
    mar = monthly_collection;
    annual_collection = annual_collection + monthly_collection;
    apr = 0;
    monthly_collection = 0;
  });
  var m = schedule.scheduleJob('1 0 1 5 *', function(){
    apr = monthly_collection;
    annual_collection = annual_collection + monthly_collection;
    may = 0;
    monthly_collection = 0;
  });
  var m = schedule.scheduleJob('1 0 1 6 *', function(){
    may = monthly_collection;
    annual_collection = annual_collection + monthly_collection;
    jun = 0;
    monthly_collection = 0;
  });
  var m = schedule.scheduleJob('1 0 1 7 *', function(){
    jun = monthly_collection;
    annual_collection = annual_collection + monthly_collection;
    jul = 0;
    monthly_collection = 0;
  });
  var m = schedule.scheduleJob('1 0 1 8 *', function(){
    jul = monthly_collection;
    annual_collection = annual_collection + monthly_collection;
    aug = 0;
    monthly_collection = 0;
  });
  var m = schedule.scheduleJob('1 0 1 9 *', function(){
    aug = monthly_collection;
    annual_collection = annual_collection + monthly_collection;
    sep = 0;
    monthly_collection = 0;
  });
  var m = schedule.scheduleJob('1 0 1 10 *', function(){
    sep = monthly_collection;
    annual_collection = annual_collection + monthly_collection;
    oct = 0;
    monthly_collection = 0;
  });
  var m = schedule.scheduleJob('1 0 1 11 *', function(){
    oct = monthly_collection;
    annual_collection = annual_collection + monthly_collection;
    nov = 0;
    monthly_collection = 0;
  });
  var m = schedule.scheduleJob('1 0 1 12 *', function(){
    nov = monthly_collection;
    annual_collection = annual_collection + monthly_collection;
    dec = 0;
    monthly_collection = 0;
  });

function daily_script(){
    var daily_level = 0;
    firebase.initializeApp({
        apiKey: "AIzaSyBFR1gb7N-_PwxE8Y0VR4afjiNP4SbLaSw",
        authDomain: "mrbin-981d3.firebaseapp.com",
        databaseURL: "https://mrbin-981d3.firebaseio.com",
        projectId: "mrbin-981d3",
        storageBucket: "mrbin-981d3.appspot.com",
        messagingSenderId: "632086240438",
        googleMapsKey: 'AIzaSyBLYavbKnK5Jj3zj5ymnrad_wbkX4v52Io'
       });
       var ref = firebase.app().database().ref('/bin');
       ref.once('value')
        .then(function (snap) {
        snap.forEach(element => {
            var garbage_level = element.val().level;
            daily_level = daily_level + (garbage_level * 400);            
        });
        daily_collection = daily_level;
        monthly_collection = monthly_collection + daily_collection ;
        });
}

app.post("/reports/annual_report",function(req,res){
    res.json({m_1:jan,m_2:feb,m_3:mar,m_4:apr,m_5:may,m_6:jun,m_7:jul,m_8:aug,m_9:sep,m_10:oct,m_11:nov,m_12:dec});        

});
app.post("/reports/last_five_details",function(req,res){
    console.log("awa");
    res.json({five:five_years_back_collection,four:four_years_back_collection,three:three_years_back_collection,two:two_years_back_collection,
    one:one_year_back_collection,current:annual_collection});  
    

});

