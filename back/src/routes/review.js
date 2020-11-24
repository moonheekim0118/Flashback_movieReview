const express = require('express');
const router = express.Router();
const reviewController  = require('../controllers/review');
const { isLoggedIn } = require('./middlewares'); // 로그인 검사 미들웨어

// 리뷰 작성
router.post('/createReview',isLoggedIn, reviewController.createReview);

module.exports=router;