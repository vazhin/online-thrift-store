import express from 'express';
import compression from 'compression';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const { sequelize } = require('./models');

async function authenticateDatabase() {
  await sequelize.authenticate();
  console.log('Database connected!');
}
authenticateDatabase();

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(flash());

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(compression());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/uploads/products',
  express.static(path.join(__dirname, '../uploads/products'))
);
app.use(
  '/uploads/users',
  express.static(path.join(__dirname, '../uploads/users'))
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

export default app;
