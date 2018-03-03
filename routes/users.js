const express = require('express');
const router = express.Router();


router.get("",function (req,res) {
    res.send("Welcome to User Page")
});
router.get("/register",function (req,res) {
    res.send("Welcome to Register Page")
});

module.exports =  router;