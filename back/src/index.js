const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');
const reviewRouter = require('./routes/review');
const db = require('../models');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportConfig = require('./passport');
const app = express();

dotenv.config();
db.sequelize.sync()
.then(()=>{
    console.log('db 연결 성공');
})
.catch(console.error);

passportConfig(); // 패스포트 설정 

app.use(cors({ // cors 설정 
    origin:'http://localhost:3000',
    credentials:true,
}));
app.use(express.json()); // body parser
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized:false,
    resave:false,
    secret:process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user',userRouter);
app.use('/movie',movieRouter); 
app.use('/review',reviewRouter);

app.listen(3065,()=>{
    console.log('서버 실행중');
})