import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const { User } = require('../models');

exports.signup = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  const image = 'uploads/users/no-profile-image.png';

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      console.log(err.message);
    }

    try {
      if (password.length < 5)
        throw new Error('Password must be at least 5 characters'); // because hash of an empty password is not empty.
      const user = await User.create({
        username,
        email,
        password: hash,
        image,
      });
      res.redirect('/login');
    } catch (err) {
      console.log(err);
      res.render('signup-form', { errors: err.errors });
    }
  });
};

exports.getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = await User.findOne({
      where: { userId: req.params.userId },
      attributes: ['username', 'email', 'image', 'userId', 'id'],
      include: 'products',
    });
    user = user.toJSON();
    res.render('user-account', {
      user: user,
      currentUser: req.user,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.editImage = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const path = req.file ? req.file.path : '';

  try {
    const user = await User.findOne({
      where: { userId },
    });

    const oldImage = user.image;
    user.image = path;

    await user.save();

    if (oldImage !== 'uploads/users/no-profile-image.png') {
      fs.unlink(oldImage, (err) => {
        if (err) throw err;
        console.log(`${oldImage} was deleted`);
      });
    }

    res.status(200).json({ message: 'image uploaded!' });
  } catch (err) {
    console.log(err);
  }
};
