var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(User.findAll());
    res.render('index', { title: 'Express' });
});

module.exports = router;
