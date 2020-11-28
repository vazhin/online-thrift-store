import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth';
import UserService from '../services/user';

exports.signup = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  const image = 'uploads/users/no-profile-image.png';

  try {
    const auth = new AuthService();
    await auth.signup({ username, email, password, image });
    res.redirect('/login');
  } catch (err) {
    console.log(err);
    res.render('signup-form', { errors: err.errors });
  }
};

exports.getUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  try {
    const userService = new UserService();
    const user = await userService.findOne(userId);
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
    const userService = new UserService();
    await userService.editImage(userId, path);
    res.status(200).json({ message: 'image uploaded!' });
  } catch (err) {
    console.log(err);
  }
};
