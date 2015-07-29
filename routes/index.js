var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(Post.findAll().get('title'));
    res.render('index', { title: 'lncwwn' });
});

module.exports = router;
