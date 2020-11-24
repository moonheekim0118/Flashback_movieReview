const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie');

// kewyord가 제목에 들어가는 영화 여러개 가져오기 
router.get('/:title/movieList',movieController.movieList);

// 연관검색어 가져오기
router.get('/:keyword/relatedSearch',movieController.relatedSearch);

module.exports=router;