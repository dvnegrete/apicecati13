const csv2json = require("../libs/csv2json");
const fs = require("fs");
const path = require("path");
const pathProyect = require("../path");
const { format } = require("date-fns")

const updateLapse = 60000
//3600000 es 1 hora, 60000 es 1 minuto

class EducativeOfferService {
  constructor(){
    const jsonOffer = [];
    this.generate();
    const jsonOfferSpecialities = [];
    setInterval(() => {
      this.generate();
    }, updateLapse);
  }

  generate(){
    const fileCSV = path.join(pathProyect + "/ofertaEducativa/programacionCursos.csv");
    this.readCSV(fileCSV)
  }

  readCSV(route){
    fs.readFile(route, (err, data) => {
      const CSV = data.toString()
      const json = csv2json(CSV, { parseNumbers: true });
      this.jsonOffer = [...json];
      const specialities = this.sortBySpeciality(this.jsonOffer);
      this.jsonOfferSpecialities = [...specialities]
    })
  }

  find(){
    return this.jsonOfferSpecialities;
  }

  sortBySpeciality(array){
    const onlySpecialities = [];
    array.forEach( item => {
      if (!onlySpecialities.includes(item.especialidad)) {
        onlySpecialities.push(item.especialidad)
      }
    });
    const forSpecialities = onlySpecialities.map( item => {
      const coursesArray = array.filter( itemObj => itemObj.especialidad === item)
      const objSpecialities = {
        specialty : item,
        courses : coursesArray
      }
      return objSpecialities
    })
    return forSpecialities;
  }

}

module.exports = EducativeOfferService;
