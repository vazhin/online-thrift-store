var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sqlite = require('sqlite3');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// const db = new sqlite.Database('./data/database.db', (err) => {
//   if (err) {
//     console.error(err.message);
//   }

//   console.log('Connected to the database.');
// });

// db.serialize(() => {
//   let sql = `SELECT ProductId as id, Name as name FROM products ORDER BY ProductId ASC`;
//   db.each(sql, [], (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log(row);
//   });

//   db.serialize(() => {
//     db.run(
//       `INSERT INTO langs(name) VALUES(?), (?), (?)`,
//       ['C', 'JS', 'GO'],
//       function (err) {
//         if (err) {
//           return console.log(err.message);
//         }
//         // get the last insert id
//         console.log(`A row has been inserted with rowid ${this.changes}`);
//       }
//     );
//   });
// });

// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Closed the database connection.');
// });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
