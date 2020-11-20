import express from 'express';
import passport from 'passport';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/users');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const {
  signup,
  getUser,
  editImage,
} = require('../controllers/users-controller');

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: true,
  })
);

router.post('/signup', signup);
router.get('/:userId', getUser);
router.put('/:userId/image', upload.single('image'), editImage);

module.exports = router;
