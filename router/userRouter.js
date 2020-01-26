const express = require('express');
const userController = require('../Controller/userController');
const authController = require('../Controller/authController');

const router = express.Router();

//signup route
router.post('/signup', authController.signup);
router.post('/login', authController.login);

//User routes
router.route('/').get(userController.getAllusers).post(userController.createUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);




module.exports = router;