const express = require('express');
const router = express.Router();
const path =  require("path");


router.get("",function (req,res) {
    res.send("Welcome to User Page")
});
router.get("/register",function (req,res) {
    res.send("Welcome to Register Page")
});
router.post("/maps",function (req,res) {
    garbage_level = req.body.level;
    var spawn = require("child_process").spawn;
    var dir = spawn('python', ['fuzzytest.py',garbage_level,3]);

    dir.stdout.on("data", function(data) {
        console.log('stdout: ' + data);
        res.json({state:true,msg:parseFloat(data)});
    });

});

module.exports =  router;