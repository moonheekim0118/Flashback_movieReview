module.exports=(sequelize, DataType)=>{
    const Movie = sequelize.define('Movie', {
        title:{
            type: DataType.STRING(100),
            allowNull :false,
        },
        image:{
            type: DataType.STRING(100),
            allowNull :true,
        },
        pubDate:{
            type: DataType.STRING(50),
            allowNull :false,
        },
        director:{
            type: DataType.STRING(50),
            allowNull :false,
        },
    }, {
        charset:'utf8',
        collate: 'utf8_general_ci'
    });

    Movie.associate = (db) => {
        db.Movie.hasMany(db.Review);
        db.Movie.belongsToMany(db.User, {through:'favoriteMovie', as:'Liked'});
    };
    return Movie;
}