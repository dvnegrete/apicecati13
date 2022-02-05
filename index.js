const express = require("express");
const multer = require("multer");
const moment = require("moment");

const app = express();
//actualizar puerto 80 en server cloud Telmex
const port = process.env.PORT || 3500;
const time = moment();

//esta configuracion permite que el nombre y la extension lleven significado al guardarse
const storage = multer.diskStorage({
  destination :"./ofertaEducativa",
  //la propiedad filename recibe una funcion
  //los parametros son req: informacion de la peticion, file: archivo que se esta subiendo y un CB
  filename: function(req, file, cb){
    cb("", file.originalname)

    //usamos mymetype para sacar la extension del archivo
    //si necesitaramos poner la fecha al archivo:
    //cb("", Date.now() + "." + mimeType.extension(file.mimetype))
  }
})

//esta funcion contiene las configuraciones con que se ejecuta Multer, podemos definir varias.
//cambiamos dest: "./ofertaEducativa" por storage ya que lo definimos
const upload = multer({
  storage: storage
});

app.get("/", (req, res) =>{
  res.send("Bienvenido. Identifícate por favor.");
});

app.get("/API/v1/upload", (req, res)=> {
  console.log(__dirname)
  res.sendFile(__dirname + "/views/index.html")
})

app.post(
  "/update",
   upload.single("csvOferta"),
    (req, res) => {
      const hora = time.format("HH:MM");
      const dia = time.format("DD/MMM/YYYY");
      res.send(`El archivo ha sido recibido el ${dia} a las ${hora}`)
      console.log("Oferta Educativa actualizada.", dia, " - ", hora);
})

app.listen(port, ()=> console.log("Servidor Express en el puerto:", port));
