const express = require('express');
const router = express.Router();
const reviewController  = require('../controllers/review');
const { isLoggedIn } = require('./middlewares'); // 로그인 검사 미들웨어

// 리뷰 작성
router.post('/createReview',isLoggedIn, reviewController.createReview);

// 리뷰 수정하기
router.put('/updateReview',isLoggedIn, reviewController.updateReview);

// 내 리뷰리스트 가져오기
router.get('/myReviews',isLoggedIn,reviewController.myReviews);

// 리뷰 1개 가져오기
router.get('/:reviewId/singleReview',reviewController.sendReview);


module.exports=router;