var geoip = require('geoip-lite');
let extIP = require("ext-ip")();


var getLocation = (ip) => {
  return new Promise((resolve,reject) => {
    if(ip.match('^([0-9]{1,3}[\.]){3}[0-9]{1,3}$')){
      let geo = geoip.lookup(ip);
      if(geo){
        resolve({geo,ip});
      }else{
        reject("Could not find geo ip");
      }
    }else{
      reject("Wrong Ip entered.")
    }
  });
}

/*getLocation("108.170.137.191").then((res)=>{
  console.log(res);
},(error)=>{
  console.log(error);
});
*/


var getExtIP = extIP.get().then(ip => {
    //console.log("your ip: ",typeof(ip));
    return getLocation(ip);
  }).catch((err)=>{
    reject(err);
  });

module.exports ={
  getExtIP,
  getLocation
}

/*getExtIP.then((res)=>{
  console.log(res);
}, (err)=>{
  console.log(err);
});
*/
