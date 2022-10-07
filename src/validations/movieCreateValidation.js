const { check, body } = require('express-validator');

module.exports = [

    check('title')
    .notEmpty().withMessage('Es obligatorio establecer un titulo')
    .bail()
    .isLength({
        min: 5,
        max: 99
    }).withMessage('Solo se puede escribir de 5 a 99 caracteres'),

    check('rating')
    .notEmpty().withMessage('Es obligatorio establecer una califación')
    .bail()
    .isNumeric({
        no_symbols: false,
    }).withMessage('Éste campo solo acepta numeros')
    .bail()
    .isInt({
        min: 1,
        max: 10
    }).withMessage('Solo se puede establecer una puntación entre 1 a 10'),

    check('awards')
    .notEmpty().withMessage('Es obligatorio establecer una cantidad de premios')
    .bail()
    .isNumeric({
        no_symbols: false,
    }).withMessage('Éste campo solo acepta numeros'),

    check('release_date')
    .notEmpty().withMessage('Es obligatorio establecer una fecha'),

    check('length')
    .notEmpty().withMessage('Es obligatorio establecer una duración')
    .bail()
    .isNumeric({
        no_symbols: false,
    }).withMessage('Éste campo solo acepta numeros'),
]   