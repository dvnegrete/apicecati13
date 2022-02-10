const csv2json = require("../libs/csv2json");
const fs = require("fs");
const path = require("path");
const pathProyect = require("../path");

class EducativeOfferService {
  constructor(){
    const jsonOffer = {};
    this.generate();
  }

  generate(){
    const fileCSV = path.join(pathProyect + "/ofertaEducativa/prueba.csv");
    this.readCSV(fileCSV)
  }

  readCSV(route){
    fs.readFile(route, (err, data) => {
      const CSV = data.toString()
      const json = csv2json(CSV, { parseNumbers: true });
      this.jsonOffer = {...json};
    })
  }

  find(){
    return this.jsonOffer
  }
}

module.exports = EducativeOfferService;
