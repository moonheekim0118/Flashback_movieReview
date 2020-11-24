const { User, Review, Movie } = require('../../models');

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