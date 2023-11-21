const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.register);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);

module.exports = router;
