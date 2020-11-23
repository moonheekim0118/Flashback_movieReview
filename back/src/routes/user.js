const express = require('express');
const user = require('../../models/user');
const router = express.Router();
const userController= require('../controllers/user');

router.post('/signUp',userController.signUp);

router.post('/login',userController.login);

router.post('/logout',userController.logout);

module.exports=router;