const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.APP_PORT;

var corsOptions = {
    origin: "http://localhost:3001"
  };
  
  // Configurar rota para servir arquivos estáticos
  app.use('/assets', express.static(__dirname + '/views/platform/assets'));

  app.use(cors(corsOptions));
  
  // parse requests of content-type - application/json
  app.use(express.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
  
  // simple route
  app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/platform/index.html");
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});