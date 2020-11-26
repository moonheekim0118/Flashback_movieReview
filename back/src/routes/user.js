const express = require('express');
const router = express.Router();
const userController= require('../controllers/user');
const { isLoggedIn, isNotLoggedIn} = require('./middlewares'); // 로그인 검사 미들웨어

router.post('/signUp', isNotLoggedIn, userController.signUp);

router.post('/login',isNotLoggedIn,userController.login);

router.post('/logout',isLoggedIn,userController.logout);

router.put('/updateNickname',isLoggedIn,userController.updateNickname);

router.get('/',userController.loadUser); // 현재 로그인한 유저 정보 로딩 

module.exports=router;