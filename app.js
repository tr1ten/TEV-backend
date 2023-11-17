const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const start = require("./db");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const teamRouter = require('./routes/team');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use prefix /api for all routes

// mongo db
start();

const router = express.Router();
router.use('/', indexRouter);
router.use('/users', usersRouter);
router.use('/team', teamRouter);
app.use('/api', router);
module.exports = app;

