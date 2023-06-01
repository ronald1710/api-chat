const logError = require("../middlewares/logError.middleware");
const ormErroHandler = require("../middlewares/ormErrorHandler.middleware");
const errorHandler = require("../middlewares/errorHandler.middleware");

const errorRoutes = (app) => {
  app.use(logError); 
  app.use(ormErroHandler); 
  app.use(errorHandler);

  
  app.use("*", (req, res) => {
    res.status(404).json({
      message: "El backend se encuentra trabajando, pronto tendremos esta ruta",
    });
  });
};

module.exports = errorRoutes;
