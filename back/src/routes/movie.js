const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie');

// 영화 id 에해당하는 영화 하나만 가져오기
router.get('/:movieId/singleMovie', movieController.singleMovie);

// kewyord가 제목에 들어가는 영화 여러개 가져오기 
router.get('/:keyword/movieList',movieController.movieList);

module.exports=router;