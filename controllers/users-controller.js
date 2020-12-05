const UserService = require('../services/user.js');
const userService = new UserService();

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  image = 'uploads/users/no-profile-image.png';
  try {
    const user = await userService.create(username, email, password, image);
    res.redirect('/login');
  } catch (err) {
    console.log(err);
    res.render('signup-form', { errors: err.errors });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await userService.findOne(req.params.userId);
    res.render('user-account', {
      user: user,
      currentUser: req.user,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.editImage = async (req, res) => {
  const userId = req.params.userId;
  const path = req.file ? req.file.path : '';
  try {
    await userService.changeImage(userId, path);
    res.status(200).json({ message: 'image uploaded!' });
  } catch (err) {
    console.log(err);
  }
};
