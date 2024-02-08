const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.APP_PORT;

var corsOptions = {
    origin: "http://localhost:3001"
  };
  
  app.use(cors(corsOptions));
  
  // parse requests of content-type - application/json
  app.use(express.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
  
  // simple route
  app.get("/", (req, res) => {
    res.json({ message: "Bem-vindo ao Ambiente de Testes." });
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});