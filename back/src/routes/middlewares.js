exports.isLoggedIn =(req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.status(401).send('로그인을 해주세요.');
    }
}

exports.isNotLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        next();
    }
    else{
        res.status(401).send('로그인을 했습니다');
    }
}