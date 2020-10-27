const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../data/users');
const {
  connectToTheDatabase,
  closeTheDatabaseConnection,
} = require('../data/db-common-functions');

passport.use(
  new LocalStrategy(function (email, password, done) {
    const db = connectToTheDatabase();

    db.get(`SELECT * FROM users WHERE email = ?`, [email], function (err, row) {
      if (err) {
        closeTheDatabaseConnection(db);
        return done(err);
      }

      if (!row) {
        closeTheDatabaseConnection(db);
        return done(null, false, { message: 'Incorrect email.' });
      }

      bcrypt.compare(password, row.password, (err, doesMatch) => {
        if (err) {
          closeTheDatabaseConnection(db);
          return done(err);
        }
        if (!doesMatch) {
          closeTheDatabaseConnection(db);
          return done(null, false, { message: 'Incorrect password.' });
        }

        const user = row;

        closeTheDatabaseConnection(db);
        return done(null, user);
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.get(userId, (user) => {
    done(null, user);
  });
});
