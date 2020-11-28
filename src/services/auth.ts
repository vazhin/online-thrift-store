import { IUser } from '../interfaces/IUser';
const { User } = require('../models');
import bcrypt from 'bcrypt';
const saltRounds = 10;

export default class AuthService {
  public async signup(newUser: IUser) {
    bcrypt.hash(newUser.password, saltRounds, async function (err, hash) {
      if (err) {
        console.log(err.message);
      }

      if (newUser.password.length < 5)
        throw new Error('Password must be at least 5 characters'); // because hash of an empty password is not empty.

      await User.create({
        username: newUser.username,
        email: newUser.email,
        password: hash,
        image: newUser.image,
      });
    });
  }
}
