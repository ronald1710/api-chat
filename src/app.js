const express = require("express");
const cors = require('cors')
require("dotenv").config();
const apiRoutes = require("./routes");
const errorRoutes = require("./routes/errors.routes");
const initModels = require('./models/initModels');
const db = require ('./utils/database')

initModels()
const app = express();
app.use(express.json(),cors());

const PORT = process.env.PORT || 8000

 db.sync()
     .then(() => console.log('Base de datos sincronizada'))
     .catch(err => console.log(err))

app.get("/", (req, res) => {
  res.send("Servidor trabajando OK");
});

apiRoutes(app);
errorRoutes(app);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});