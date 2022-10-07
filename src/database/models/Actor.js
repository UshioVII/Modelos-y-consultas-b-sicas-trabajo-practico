module.exports = (sequelize, dataTypes) => {

    const alias = "Actor";

    const cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        last_name:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        rating:{
            type: dataTypes.DECIMAL(3,1),
            allowNull: true,
            dafeultValue: null
        },
        favorite_movie_id:{
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            dafeultValue: null
        }
    }

    const config = {
        tableName: "actors",
        timesTamps: true,
        underscored: true
    }

    const Actor = sequelize.define(alias, cols, config)


    Actor.associate = (models) => {
        Actor.belongsToMany(models.Movie,{
            as: "movies",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id"
        });
    }

    return Actor;
}