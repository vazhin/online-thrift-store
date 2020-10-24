var express = require('express');
var router = express.Router();

const { signup, login, getUser } = require('../controllers/users-controller');

router.post('/login', login);
router.post('/signup', signup);
router.get('/:userId', getUser);

module.exports = router;
