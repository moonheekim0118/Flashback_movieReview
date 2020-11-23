module.exports=(sequelize, DataType)=>{
    const Review = sequelize.define('Review', {
        shortComment:{
            type: DataType.STRING(50),
            allowNull :false,
        },
        character:{
            type: DataType.STRING(50),
            allowNull :false,
        },
        line:{
            type: DataType.STRING(50),
            allowNull :false,
        },
        scene:{
            type: DataType.STRING(50),
            allowNull :false,
        },
        freeComment:{
            type: DataType.STRING(50),
            allowNull :false,
        },
    }, {
        charset:'utf8',
        collate: 'utf8_general_ci'
    });

    Review.associate = (db) => {
        db.Review.belongsTo(db.User);
        db.Review.belongsTo(db.Movie);
    };
    return Review;
}