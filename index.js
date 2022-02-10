const express = require("express");
const routerApi = require("./routes")
const path =require("./path");
const app = express();

const expressionPath = /dvnegrete/
//puerto 80 en server cloud Telmex
const port = process.env.PORT || (expressionPath.test(path) ? 3500 : 80);

app.get("/", (req, res) =>{
  res.send("Bienvenido. Identifícate por favor.");
});

routerApi(app);

app.listen(port, ()=> console.log("Servidor Express en el puerto:", port));
