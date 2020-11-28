import fs from 'fs';
const { User } = require('../models');

export default class UserService {
  public async findOne(userId: string) {
    const user = await User.findOne({
      where: { userId },
      attributes: ['username', 'email', 'image', 'userId', 'id'],
      include: 'products',
    });

    return user.toJSON();
  }

  public async editImage(userId: string, path: string) {
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
  }
}
