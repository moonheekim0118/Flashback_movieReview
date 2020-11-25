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

exports.movieList=async(req,res,next)=>{
    try{
        const title=decodeURIComponent(req.params.title);
        const start=+req.query.start; // 스타트지점 
        await request.get(
        {
            uri:process.env.API_URI+`?query=${encodeURIComponent(title)}&start=${start}`, 
            headers:headers,
            method: 'GET'
        },
        (error,response,body) => {
            if(!error){
                const data = JSON.parse(body); // 오브젝트로 파싱 
                res.status(200).json(data.items);
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
                res.status(200).json(data.items);
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