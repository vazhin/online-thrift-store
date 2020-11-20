import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

const { User } = require('../models');

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const user = await User.findOne({ where: { username } });
    if (!user) return done(null, false, { message: 'Incorrect username.' });

    bcrypt.compare(password, user.password, (err, doesMatch) => {
      if (err) return done(err);
      if (!doesMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser((user: { userId: string }, done) => {
  done(null, user.userId); // only the user ID is serialized to the session
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findOne({
      where: { userId },
      attributes: ['username', 'email', 'image', 'userId', 'id'],
    });
    done(null, user.toJSON()); // this will be restored to req.user
  } catch (err) {
    done(err);
  }
});
