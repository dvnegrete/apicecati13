const dns =require("dns");
const plantel = "cecati13.ddns.net"

const whitelist = [
  "http://localhost:3500",
  "http://localhost:5501",
  "http://cecati13.com.mx",
  "http://www.cecati13.com.mx",
  "https://cecati13.com.mx",
  "https://www.cecati13.com.mx",
  isSchool
];

const isSchool = dns.lookup(plantel, (err, address) => {
  if(err){
    console.log("Fallo la consulta DNS del plantel")
  }
  return "http://" + plantel;
})

const options = {
  origin: (origin, cb) => {
    if (whitelist.includes(origin) || !origin) {
      cb(null, true)
    } else {
      cb (new Error ("acceso no permitido"))
    }
  }
}

module.exports = options;
