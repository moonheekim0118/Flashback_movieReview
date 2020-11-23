const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../../models');
const bcrypt = require('bcrypt');

module.exports=()=>{
    passport.use(new LocalStrategy(
        {
            usernameField:'email',
            passwordField: 'password',

        }, async (email,password,done)=>{
           try{
                const user = await User.findOne({
                    where: { email}
                });
                if(!user){
                    return done(null,false,{reason:"존재하지 않는 이메일 입니다!"});
                }
                const correct=await bcrypt.compare(password, user.password);
                if(correct){
                    return done(null, user);
                }
                else{
                    return done(null,false, {reason:"비밀번호가 일치하지 않습니다!"});
                }
           }
           catch(err){
               console.error(err);
               return done(err);
           }
        }
    ));
}