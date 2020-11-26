module.exports=(sequelize, DataType)=>{
    const User = sequelize.define('User', {
        email:{
            type: DataType.STRING(50),
            allowNull :false,
            unique:true,
        },
        nickname:{
            type: DataType.STRING(6),
            allowNull :false,
        },
        password:{
            type: DataType.STRING(100),
            allowNull :false,
        },
        profilePic:{
            type: DataType.STRING(200),
            allowNull :true,
        },
    }, {
        charset:'utf8',
        collate: 'utf8_general_ci'
    });

    User.associate = (db) => {
        db.User.hasMany(db.Review);
        db.User.belongsToMany(db.Movie, {through:'favoriteMovie', as:'Liker'});
    }
    return User;
}