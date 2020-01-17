const express = require('express');
const userController = require('../Controller/userController');


const router = express.Router();

//User routes
router.route('/').get(userController.getAllusers).post(userController.createUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);




module.exports = router;