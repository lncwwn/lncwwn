let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let RedisStore = require('connect-redis')(session);

let routes = require('./routes/index');
let users = require('./routes/users');
let posts = require('./routes/posts');
let resource = require('./routes/resource');

let redisConfig = require('./config/redis.config.json');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '3072kb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(session({
    store: new RedisStore({
        'host': redisConfig.host,
        'port': redisConfig.port,
        'db': redisConfig.db
    }),
    name: 'app_lncwwn',
    secret: 'lncwwn',
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next) {
    const qiNiuUrl = 'http://7xkzmo.com1.z0.glb.clouddn.com/';
    app.locals.appName = '那畔行';
    app.locals.currentUser = req.session.currentUser || null;
    if (app.locals.currentUser && app.locals.currentUser.avatar) {
        app.locals.currentUser.avatarUrl = qiNiuUrl + app.locals.currentUser.avatar;
    }
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/posts', posts);
app.use('/resource', resource);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
        message: err.message,
        error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
