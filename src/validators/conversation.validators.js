const { check } = require("express-validator");
const validateResult = require("../utils/validate");

const conversationsInPairsValidator = [
    check("title", "Error con el campo title")
      .exists()
      .withMessage("El campo title es obligatorio")
      .notEmpty()
      .withMessage("Title no debe de estar vacido")
      .isString()
      .withMessage("El tipo de dato debe de ser string"),
    check("typeId", "Error con el campo email")
      .exists()
      .withMessage("El campo typeId es obligatorio")
      .isInt()
      .withMessage("El typeId debe de ser un numero")
      .notEmpty()
      .withMessage("El typeId no debe de estar vacido"),
    check("createBy", "Error con el campo createdBy")
      .exists()
      .withMessage("El campo createBy es obligatorio")
      .isInt()
      .withMessage("El cresteBy debe de ser un numero")
      .notEmpty()
      .withMessage("La createBy no debe de estar vacio"),
    validateResult,
  ];

  const conversationsInGroupValidator = [
    check("title", "Error con el campo title")
      .exists()
      .withMessage("El campo title es obligatorio")
      .notEmpty()
      .withMessage("Title no debe de estar vacido")
      .isString()
      .withMessage("El tipo de dato debe de ser string"),
    check("typeId", "Error con el campo email")
      .exists()
      .withMessage("El campo typeId es obligatorio")
      .isInt()
      .withMessage("El typeId debe de ser un numero")
      .notEmpty()
      .withMessage("El typeId no debe de estar vacido"),
    check("createBy", "Error con el campo createdBy")
      .exists()
      .withMessage("El campo createBy es obligatorio")
      .isInt()
      .withMessage("El cresteBy debe de ser un numero")
      .notEmpty()
      .withMessage("La createBy no debe de estar vacio"),
    validateResult,
  ];


  module.exports = {
    conversationsInPairsValidator,
    conversationsInGroupValidator
  }