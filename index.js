const express = require("express");
const routerApi = require("./routes")
const path =require("./path");
const app = express();

const expressionPath = /dvnegrete/
//actualizar puerto 80 en server cloud Telmex
const port = process.env.PORT || (expressionPath.test(path) ? 3500 : 80);

app.get("/", (req, res) =>{
  res.send("Bienvenido. Identifícate por favor.");
});

routerApi(app);

// app.post(
//   "/update",
//    upload.single("csvOferta"),
//     (req, res) => {
//       const hora = time.format("HH:MM");
//       const dia = time.format("DD/MMM/YYYY");
//       res.send(`El archivo ha sido recibido el ${dia} a las ${hora}`)
//       console.log("Oferta Educativa actualizada.", dia, " - ", hora);
// })

app.listen(port, ()=> console.log("Servidor Express en el puerto:", port));
