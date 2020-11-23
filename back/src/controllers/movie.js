const dotenv = require('dotenv');
const request = require('request');

dotenv.config();

const headers =  {
    'Host':'openapi.naver.com',
    'User-Agent': 'curl/7.49.1',
    'Accept':'*/*',
    'X-Naver-Client-Id':process.env.CLIENT_ID,
    'X-Naver-Client-Secret':process.env.CLIENT_SECRET
}

exports.singleMovie=async(req,res,next)=>{
    try{
        const movieId=req.params.movieId;
        await request.get({

        });
    }catch(err){
        console.error(err);
        next(err);
    }
}

exports.movieList=async(req,res,next)=>{
    try{
        const keyword=req.params.keyword;
        await request.get(
        {
            uri:process.env.API_URI+`?query=${encodeURIComponent(keyword)}`,
            headers:headers,
            method: 'GET'
        },
        (error,response,body) => {
            if(!error){
                console.log(body);
                res.json(body);
            }
            else{
                console.log(response);
                res.status(500).json(error);
            }
        }
        );
    }catch(err){
        console.error(err);
        next(err);
    }
}

exports.relatedSearch=async(req,res,next)=>{
    try{
        const keyword=req.params.keyword;
        await request.get(
        {
            uri:process.env.API_URI+`?query=${encodeURIComponent(keyword)}`,
            headers:headers,
            method: 'GET'
        },
        (error,response,body) => {
            if(!error){
                const data = JSON.parse(body); // 오브젝트로 파싱 
                res.json(data.items);
            }
            else{
                console.log(response);
                res.status(500).json(error);
            }
        }
        );
    }catch(err){
        console.error(err);
        next(err);
    }
}