const { User, Review, Movie } = require('../../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const user = require('../../models/user');
const movie = require('../../models/movie');

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


exports.loadUser=async(req,res,next)=>{
    try{
        if(req.user){
            // 패스워드 제외한 유저 정보 
            const fullUserwithoutPassword = await User.findOne({
                where:{id:req.user.id},
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
        }
        else{
            res.status(200).json(null);
        }
    }catch(error){
        console.log(error);
        next(error);
    }
}


exports.updateNickname=async(req,res,next)=>{
    try{
        const newNickname = req.body.nickname; // 새로운 닉네임 
        const user = await User.findOne({ 
            where:{id:req.user.id}
        });
        user.nickname=newNickname; // 닉네임 변경 
        await user.save();
        res.status(200).json(newNickname);
    }catch(error){
        console.error(error);
        next(error);
    }
};


exports.updateProfilePic = async(req,res,next)=>{
    try{
        const fileUrl=req.files[0].filename;
        const user = await User.findOne({
            where:{id:req.user.id}
        });
        user.profilePic=fileUrl;
        await user.save();
        res.status(200).json(fileUrl);
        
    }catch(error){
        console.error(error);
        next(error);
    }
}

exports.addFavoriteMovie = async(req,res,next)=>{ // 인생영화 추가 
    try{
        // 이미 10개 등록되어있다면 에러메시지 띄워주기.
        // user.getLiked

        // movie db에 저장 
        const movieInfo = req.body;
        const exMovie = await Movie.findOne({
            where:{title:movieInfo.title, director:movieInfo.director, image:movieInfo.image}
        });
        let movie;
        if(exMovie){
            movie=exMovie;
        }
        else{
            movie = await Movie.create({
                title:movieInfo.title,
                image:movieInfo.image,
                pubDate:movieInfo.pubDate,
                director:movieInfo.director
            })
        }
        const user = await User.findOne({where:{id:req.user.id}});
        
        const counts = await user.countLiker(); // 저장된 인생영화 
        if(counts === 10) { // 인생영화가 10개일 경우  
            return res.status(401).json('이미 인생영화가 꽉 찼습니다!');
        }
        user.addLiker(movie); // 인생영화 저장
        return res.status(200).json(movie);
        
    }catch(error){
        console.error(error);
        next(error);
    }
}


exports.loadFavoriteMovies=async(req,res,next)=>{
    try{
        const user = await User.findOne({where:{id:req.user.id}});
        const movies = await user.getLiker();
        res.status(200).json(movies);
    }catch(error){
        console.error(error);
        next(error);
    }
};

exports.removeFavoriteMovie=async(req,res,next)=>{
    try{
        const movieId=+req.params.movieId;
        const user = await User.findOne({where:{id:req.user.id}});
        await user.removeLiker(movieId); // 삭제 
        res.status(200).json(movieId);
    }catch(error){
        console.error(error);
        next(error);
    }
};

