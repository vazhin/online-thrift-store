const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { User } = require('../models');

class UserService {
  async create(username, email, password, image) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) reject(err.message);

        if (password.length < 5)
          reject('Password must be at least 5 characters');

        try {
          const user = await User.create({
            username,
            email,
            password: hash,
            image,
          });
          resolve(user);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  async findOne(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({
          where: { userId },
          attributes: ['username', 'email', 'image', 'userId', 'id'],
          include: 'products',
        });
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  async changeImage(userId, newImage) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({
          where: { userId },
        });

        const oldImage = user.image;
        user.image = newImage;
        await user.save();

        // don't delete default user image
        if (oldImage !== 'uploads/users/no-profile-image.png') {
          fs.unlink(oldImage, (err) => {
            if (err) throw err;
            console.log(`${oldImage} was deleted`);
          });
        }
        resolve(newImage);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = UserService;
