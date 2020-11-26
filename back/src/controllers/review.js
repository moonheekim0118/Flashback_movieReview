const { User, Review, Movie } = require('../../models');
const { Op } = require('sequelize');

exports.createReview = async(req,res,next)=>{
    try{
        const movieInfo = req.body.Movie; // 영화 정보 
        const exMovie = await Movie.findOne({ // 이미 존재 하는 지 체크 
            where:{title:movieInfo.title,
                director:movieInfo.director,
                image:movieInfo.image,
             }
        })
        let movie;
        if(exMovie){
            movie=exMovie;
        }
        else{
            movie = await Movie.create({ // 영화 데이터베이스에 저장 
            title:movieInfo.title,
            image:movieInfo.image,
            pubDate:movieInfo.pubDate,
            director:movieInfo.director
        });
        }
        const review = await Review.create({ // 리뷰 create 
            UserId:req.user.id,
            MovieId:movie.id,
            shortComment:req.body.shortComment,
            character:req.body.character,
            line:req.body.line,
            scene:req.body.scene,
            freeComment:req.body.freeComment,
            rating:req.body.rating,
        });

        const fullReview = await Review.findOne({ // 전체 리뷰 불러오기 
            where:{id:review.id},
            include:[
                { model : Movie},  // 영화 정보 포함 
                { model : User, attributes:['id','nickname']},  // 작성자 정보 포함 
            ]
        });
        res.status(201).json(fullReview);
    }catch(error){
        console.error(error);
        next(error);
    }
};

exports.updateReview=async(req,res,next)=>{
    try{
        const content = req.body;
        const review = await Review.findOne({
            where:{id:content.id, UserId:req.user.id}
        });
        // 내용 수정 
        review.shortComment=content.shortComment;
        review.line=content.line;
        review.character=content.character;
        review.rating=content.rating;
        review.scene=content.scene;
        review.freeComment=content.freeComment;

        await review.save();
        const fullReview = await Review.findOne({ // 전체 리뷰 불러오기 
            where:{id:review.id},
            include:[
                { model : Movie},  // 영화 정보 포함 
                { model : User, attributes:['id','nickname']},  // 작성자 정보 포함 
            ]
        });
        res.status(200).json(fullReview);
    }catch(error){
        console.error(error);
        next(error);
    }
};

exports.removeReview=async(req,res,next)=>{
    try{
        const reviewId = +req.params.reviewId;
        const review = await Review.findOne({where:{id:reviewId,UserId:req.user.id}}); // 삭제할 리뷰 존재하는지 찾기 
        if(!review){ // 존재하지 않는 경우 
            return res.status(401).json('존재하지 않는 리뷰입니다.');
        }
        await Review.destroy({where:{id:reviewId, UserId:req.user.id}}); // 삭제 
        res.status(200).json(reviewId);
    }catch(error){
        console.error(error);
        next(error);
    } 
}

exports.sendReview=async(req,res,next)=>{
    try{
        const reviewId=req.params.reviewId;
        const review = await Review.findOne(
            { where:{id:reviewId},
            include:[
                { model : Movie},  // 영화 정보 포함 
                { model : User, attributes:['id','nickname']},  // 작성자 정보 포함 
            ]
        });
        console.log(review, reviewId);
        res.status(201).json(review);
    }catch(error){
        console.error(error);
        next(error);
    }
}


exports.myReviews=async(req,res,next)=>{
    try{
        const where={UserId:req.user.id};
        const lastId=+req.query.lastId;
        if(lastId!==0){
            where.id={[Op.lt]:lastId};
        }
        const reviews = await Review.findAll({
            where,
            limit:10,
            order:[
                ['createdAt','DESC'],
            ],
            include:[
                { model : Movie},  // 영화 정보 포함 
                { model : User, attributes:['id','nickname']},  // 작성자 정보 포함 
            ]
        });
        res.status(200).json(reviews);
        
    }catch(error){
        console.error(error);
        next(error);
    }
    
}