module.exports = (sequelize, dataTypes) => {

    const alias = "Movie";

    const cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title:{
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull: false
        },
        awards:{
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            dafaultValue: 0
        },
        release_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        length: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            dafaultValue: null
        },
        genre_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            dafaultValue: null
        }
    }
    const config = {
        tableName: "movies",
        timesTamps: true,
        underscored: true
    }

    const Movie = sequelize.define(alias, cols, config)

    Movie.associate= (models) => {
        Movie.belongsTo(models.Genre,{
            as: "genre",
            foreignKey: "genre_id"
        });

        Movie.belongsToMany(models.Actor,{
            as: "actors",
            through: "actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id"
        });
    }



    return Movie;
}