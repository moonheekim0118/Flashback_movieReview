const express = require('express');
const router = express.Router();
const userController= require('../controllers/user');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

try{
    fs.accessSync('uploads');
}catch(error){
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req,file,done){
            done(null,'uploads')
        },
        filename(req,file,done){
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            done(null, basename + new Date().getTime()+ext);
        }
    }),
    limits:{fileSize:20*1024*1024} // 20mg limit
});


const { isLoggedIn, isNotLoggedIn} = require('./middlewares'); // 로그인 검사 미들웨어

router.post('/signUp', isNotLoggedIn, userController.signUp);

router.post('/login',isNotLoggedIn,userController.login);

router.post('/logout',isLoggedIn,userController.logout);

router.put('/updateNickname',isLoggedIn,userController.updateNickname);

router.post('/updateProfilePic', isLoggedIn, upload.array('image'), userController.updateProfilePic);

router.post('/addFavoriteMovie',isLoggedIn,userController.addFavoriteMovie); // 인생영화 등록 

router.get('/',userController.loadUser); // 현재 로그인한 유저 정보 로딩 

module.exports=router;