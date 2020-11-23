const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');
const db = require('../models');
const app = express();

db.sequelize.sync()
.then(()=>{
    console.log('db 연결 성공');
})
.catch(console.error);

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user',userRouter);

app.listen(3065,()=>{
    console.log('서버 실행중');
})