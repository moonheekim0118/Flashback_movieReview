const { User, Review } = require('../../models');
const bcrypt = require('bcrypt');

exports.signUp=async(req,res,next)=>{
    try{
        const exUser=await User.findOne({ // 이메일 중복 체크 
            where:{
                email:req.body.email
            }
        });
        if(exUser){ // 이메일 중복 
            return res.status(403).send('이미 사용중인 이메일 입니다.');
        };

        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const user = await User.create({
            email:req.body.email,
            nickname:req.body.nickname,
            password:hashedPassword
        });
        res.status(200).send("ok"); 

    }catch(error){
        console.error(error);
        next(error);
    }
};