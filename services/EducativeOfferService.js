const csv2json = require("../libs/csv2json");
const fs = require("fs");
const path = require("path");
const pathProyect = require("../path");
const { format } = require("date-fns")

const updateLapse = 3600000
//3600000 es 1 hora, 60000 es 1 minuto

class EducativeOfferService {
  constructor(){
    const jsonOffer = [];
    this.generate();
    setInterval(() => {
      this.generate();
      console.log("Actualizando API Oferta Educativa... ",format(new Date(), 'dd/MMM/yyyy HH:mm:ss'))
    }, updateLapse);
  }

  generate(){
    const fileCSV = path.join(pathProyect + "/ofertaEducativa/prueba.csv");
    this.readCSV(fileCSV)
  }

  readCSV(route){
    fs.readFile(route, (err, data) => {
      const CSV = data.toString()
      const json = csv2json(CSV, { parseNumbers: true });
      this.jsonOffer = [...json];
    })
  }

  find(){
    return this.jsonOffer
  }

}

module.exports = EducativeOfferService;
