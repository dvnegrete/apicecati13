const express = require("express");
const routerApi = require("./routes")
const cors = require("cors");
const path = require("./path");
const app = express();

const expressionPath = /dvnegrete/
//puerto 80 en server cloud Telmex
const port = process.env.PORT || (expressionPath.test(path) ? 3500 : 80);

const whitelist = [
  "http://localhost:3500",
  "http://localhost:5501",
  "http://cecati13.com.mx",
  "http://www.cecati13.com.mx",
  "https://cecati13.com.mx",
  "https://www.cecati13.com.mx"];
const options = {
  origin: (origin, cb) => {
    if (whitelist.includes(origin) || !origin) {
      cb(null, true)
    } else {
      cb (new Error ("acceso no permitido"))
    }
  }
}

app.use(cors(options));

app.get("/", (req, res) =>{
  res.send("Bienvenido. Identifícate por favor.");
});

routerApi(app);

app.listen(port, ()=> console.log("Servidor Express en el puerto:", port));
