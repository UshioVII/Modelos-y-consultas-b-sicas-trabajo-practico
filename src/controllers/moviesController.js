const db = require('../database/models')
const { validationResult } = require('express-validator');
const moment = require('moment');
const sequelize = db.sequelize;
const {Op} = require("sequelize");

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id,{
            include: [
                {
                    association: 'genre'
                },
                {
                    association: 'actors'
                }
            ]
        })
        .then(movie => {
            res.render('moviesDetail.ejs', {movie});
        });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        db.Genre.findAll({order: ['name']
    })
        .then(genres => {return res.render('moviesAdd',{genres});
    })
        .catch(err => console.log(err));
    },
    create: function (req, res) {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
            db.Movie.create({
                ...req.body,
                title: req.body.title.trim()
            })
            .then(newMovie => {
                console.log(newMovie)
                return res.redirect('/movies/detail/' + newMovie.id);
            })
            .catch(err => console.log(err));
        }else{
            db.Genre.findAll({order: ['name']
        })
            .then(genres => {return res.render('moviesAdd',{genres, errors: errors.mapped(), old: req.body}) })

            .catch(err => console.log(err));
        }
    },
    edit: function(req, res) {
        let movie = db.Movie.findByPk(req.params.id);
        let genres = db.Genre.findAll({
            order: ['name']
        });
        Promise.all([movie, genres])
        .then(([movie, genres]) =>{
            return res.render('moviesEdit',{
                Movie: movie,
                genres,
                moment
            })
        })
        .catch(err => console.log(err));
    },
    update: function (req,res) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
        db.Movie.update(
            {
                ...req.body
            },
            {
                where: {
                    id : req.params.id
                }
            }
        )
        .then(result =>{
            console.log(">>>>>>>>>>>", result);
            return res.redirect("/movies/detail/" + req.params.id)
        })
        .catch(error => console.log(error))
        }else{
            let genres = db.Genre.findAll({
                order: ['name']
            });
            let movie = db.Movie.findByPk(req.params.id);
            Promise.all([movie, genres])
            .then(([movie, genres]) =>{
                return res.render('moviesEdit',{
                    errors: errors.mapped(),
                    Movie: movie,
                    genres,
                    moment,
                })
            })
            .catch(error => console.log(error))
        }
    },
    delete: function (req, res) {
        db.Movie.findByPk(req.params.id)
        .then(movie => {
            return res.render('moviesDelete',{
                Movie: movie
            })
        })
        .catch(error => console.log(error))
    },
    destroy: function (req, res) {
        db.Movie.destroy({
            where: {
                id : req.params.id
            }
        })
        .then(result =>{
            console.log(">>>>>>>>>>>", result);
            return res.redirect("/movies")
        })
        .catch(error => console.log(error))
    }

}

module.exports = moviesController;