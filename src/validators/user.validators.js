const { check } = require("express-validator");
const validateResult = require("../utils/validate");

const createUserValidator = [
  check("username", "Error con el campo username")
    .exists()
    .withMessage("El campo username es obligatorio")
    .notEmpty()
    .withMessage("Username no debe de estar vacido")
    .isString()
    .withMessage("El tipo de dato debe de ser string")
    .isLength({ min: "6", max: "30" })
    .withMessage("El username debe de tener minimo 6 caracteres y maximo 30"),
  check("email", "Error con el campo email")
    .exists()
    .withMessage("El campo email es obligatorio")
    .notEmpty()
    .withMessage("El email no debe de estar vacido")
    .isString()
    .withMessage("El tipo de dato debe de ser string")
    .isEmail()
    .withMessage("El Email debe de ser una direccion valida")
    .isLength({ min: "7", max: "50" })
    .withMessage("El email debe de tener minimo 7 caracteres y maximo 50"),
  check("password", "Error con el campo password")
    .exists()
    .withMessage("El campo password es obligatorio")
    .notEmpty()
    .withMessage("La contraseña no debe de estar vacio")
    .isString()
    .withMessage("El tipo de dato debe de ser string")
    .isLength({ min: "8" })
    .withMessage("La contraseña debe de tener minimo 8 caracteres"),
  validateResult,
];

const loginUserValidator = [
  check("email", "Error con el campo email")
    .exists()
    .withMessage("El campo debe de ser obligatorio")
    .notEmpty()
    .withMessage("El campo email no debe de estar vacio")
    .isEmail()
    .withMessage("El email debe de uno valido"),
  check("password", "Error con el campo password")
    .exists()
    .withMessage("El campo debe de ser obligatorio")
    .notEmpty()
    .withMessage("El campo password no debe de estar vacio")
    .isLength({ min: "8" })
    .withMessage("La contraseña debe de tener minimo 8 caracteres"),
  validateResult,
];

module.exports = {
  createUserValidator,
  loginUserValidator,
};
