const { User, Review } = require('../../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

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

exports.login=async(req,res,next)=>{
    passport.authenticate('local', (err,user,info)=>{
        if(err){ // 서버 에러 
            console.error(err);
            return next(err);
        }
        if(info){ // 클라이언트 에러 
            return res.status(401).send(info.reason);
        }
        return req.login(user,async(loginErr)=>{
            if(loginErr){ // 패스포트 로그인 에러 
                console.log(loginErr);
                return next(loginErr);
            }
            // 패스워드 제외한 유저 정보 
            const fullUserwithoutPassword = await User.findOne({
                where:{id:user.id},
                attributes:{
                    exclude:['password']
                },
                include:[{
                    model:Review,
                    attributes:['id']
                }]
            });
            const data = fullUserwithoutPassword.toJSON();
            data.Reviews = data.Reviews.length; // 리뷰 개수만 보내줌 
            return res.status(200).json(data);
        })
    })(req,res,next);
    
};


exports.logout=(req,res,next)=>{
    req.logout();
    req.session.destroy();
    res.status(200).send('okay');
}
