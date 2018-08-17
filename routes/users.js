const express = require('express');
const router = express.Router();
const path =  require("path");


router.get("",function (req,res) {
    res.send("Welcome to User Page")
});
router.get("/register",function (req,res) {
    res.send("Welcome to Register Page")
});
//When user types maps on url
router.post("/maps",function (req,res) {
    console.log("awa");
    //Get the data and pass to calculate optimal solution
    var garbage_level = req.body.level;
    var loc_prioroty = req.body.priority;
    var garb_bin_id = req.body.bin_id;
    var garb_description = req.body.description;
    var garb_longit = req.body.longit;
    var garb_latti = req.body.latti;

    //require python file
    var spawn = require("child_process").spawn;
    var dir = spawn('python', ['fuzzytest.py',garbage_level,loc_prioroty]);

    dir.stdout.on("data", function(data) {
        console.log('stdout: ' + data);
        //Pass optimal solution as msg to front-end with bin id
        res.json({id:garb_bin_id,description:garb_description,lon:garb_longit,lat:garb_latti,value:parseFloat(data)});
    });

});

module.exports =  router;