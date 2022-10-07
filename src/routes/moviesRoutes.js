const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const movieCreateValidation = require('../validations/movieCreateValidation');

router.get('/', moviesController.list);
router.get('/new', moviesController.new);
router.get('/recommended', moviesController.recomended);
router.get('/detail/:id', moviesController.detail);


//Rutas exigidas para la creación del CRUD
router.get('/add', moviesController.add);
router.post('/create', movieCreateValidation ,moviesController.create);

router.get('/edit/:id', moviesController.edit);
router.post('/update/:id', moviesController.update); // Idealmente va por Put

router.get('/delete/:id', moviesController.delete); 
router.post('/delete/:id', moviesController.destroy);

module.exports = router;