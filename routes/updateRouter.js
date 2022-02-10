const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pathProyect = require("../path")
const { format } = require("date-fns")

const pathOfertaEducativa = path.join(pathProyect + "/ofertaEducativa")

//esta configuracion permite que el nombre y la extension lleven significado al guardarse
const storage = multer.diskStorage({
  destination : pathOfertaEducativa,
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

router.post(
  "/", upload.single("csvOferta"), (req, res) => {
    const time = format(new Date(), 'dd/MMM/yyyy HH:mm:ss');
    res.send(`El archivo ha sido recibido. ${time}`)
    const messageDate = "Archivo de Oferta Educativa recibido el: " + time;
    console.log(messageDate)
    fs.writeFileSync(pathOfertaEducativa + "/timestamp.txt",
      messageDate,
      ()=> console.log(messageDate)
    );
})

router.get("/", (req, res) => {
  const lastUpdate =  fs.readFile(
      pathOfertaEducativa + "/timestamp.txt",
      (err, data) => {
        if (err) throw err;
        const date = data.toString()
        res.send(date)
    });
})

module.exports = router;
