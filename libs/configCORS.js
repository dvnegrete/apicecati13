const dns = require("dns");

const whitelist = [
  "http://localhost:3500",
  "http://localhost:5501",
  "http://cecati13.com.mx",
  "http://www.cecati13.com.mx",
  "https://cecati13.com.mx",
  "https://www.cecati13.com.mx"
];
const plantel = "cecati13.ddns.net";

class OptionsCORS {
  constructor(array){
      console.log("Creando objeto en el constructor")
      const options = this.createRuleOrigin(array);
      return options;
  }

  async createRuleOrigin(array){
    const options = {
      origin: (origin, cb) => {
        console.log(array, "dentro de options")
        if (array.includes(origin) || !origin) {
          cb(null, true)
        } else {
          cb (new Error ("acceso no permitido"))
        }
      }
    }
    console.log("por retornar options dentro de CLASS")
    return options;
  }
}

async function isSchool(){
  dns.lookup(plantel, (err, address) => {
    if (err) {
      console.log("Fallo la consulta DNS del plantel");
    }
    let ipDDNS = "http://" + address;
    whitelist.push(ipDDNS);
    console.log("ipDDNS ", ipDDNS);
    console.log("whitelist ", whitelist);
  })

}
isSchool();
setTimeout(() => {
  console.log("witheList justo antes de crear objeto: ", whitelist)
  const options = new OptionsCORS(whitelist)
  console.log("Objeto Creado: ", options)
}, 10);
