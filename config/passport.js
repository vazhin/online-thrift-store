const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../data/User');
const Database = require('../data/Database');

passport.use(
  new LocalStrategy(function (username, password, done) {
    const db = Database.open();

    db.get(`SELECT * FROM users WHERE username = ?`, [username], function (
      err,
      row
    ) {
      if (err) {
        Database.close(db);
        return done(err);
      }

      if (!row) {
        Database.close(db);
        return done(null, false, { message: 'Incorrect email.' });
      }

      bcrypt.compare(password, row.password, (err, doesMatch) => {
        if (err) {
          Database.close(db);
          return done(err);
        }
        if (!doesMatch) {
          Database.close(db);
          return done(null, false, { message: 'Incorrect password.' });
        }

        const user = {
          id: row.user_id,
          username: row.username,
          email: row.email,
          hash: row.password,
        };

        Database.close(db);
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
