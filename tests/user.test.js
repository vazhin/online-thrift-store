const UserService = require('../services/user.js');
const userService = new UserService();

describe('UserService', () => {
  let newUser;

  it('creates a user', async (done) => {
    try {
      newUser = await userService.create(
        `username${Math.ceil(Math.random() * 1000)}`,
        `username${Math.ceil(Math.random() * 1000)}@email.com`,
        '12345',
        'uploads/users/no-profile-image.png'
      );
      expect(newUser).toHaveProperty('username');
      done();
    } catch (err) {
      done(err);
    }
  });

  it('finds a user by userId', async (done) => {
    try {
      const user = await userService.findOne(newUser.userId);
      expect(user).toHaveProperty('username');
      done();
    } catch (err) {
      done(err);
    }
  });

  it('changes user image', async (done) => {
    const newImage = await userService.changeImage(
      newUser.userId,
      'uploads/users/no-profile-image.png'
    );
    try {
      expect(newImage).toBe('uploads/users/no-profile-image.png');
      done();
    } catch (err) {
      done(err);
    }
  });
});
