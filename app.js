const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const database = require('./models/database');
const auth = require('./middlewares/auth');
const image = require('./routers/profile');
const path = require('path');
const product = require('./models/product');
const url = require('url');
const parse = require('url-parse');


// Create app
const app = express();
const port = process.env.PORT || 3000;
const RedisStore = require('connect-redis')(session);
// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

const REDIS_URL = process.env.REDIS_URL || 'redis://:@localhost:17038';
const redisOptions = url.parse(REDIS_URL);
app.use(session({
  store : new RedisStore({
    host : redisOptions.hostname,
    port : redisOptions.port,
    pass : redisOptions.auth.split(':')[1],
  }),
  secret :  process.env.SESSION_SECRET || 'secret',
  resave : false
}))
// Add middlewares
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/image'));

// Check login user
app.use(auth);

// Load routers
app.use('/', require('./routers/home'));
app.use('/todo', require('./routers/todo'));
app.use('/auth', require('./routers/auth'));
app.use('/profile', require('./routers/profile'));
app.use('/auth/signup', require('./routers/auth'));
app.use('/auth/login', require('./routers/auth'));
// Static file


// Connect database
database.sync().then(function() {
  app.listen(port);
  console.log(`Server is listening on port ${port}`);
}).catch(function(err) {
  console.log(err);
  process.exit(1);
});
