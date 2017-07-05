const yargs = require('yargs');
const axios = require('axios');
const geo = require("./geo");


const argv = yargs
  .options({
    a:{
      demand:false,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string : true, //always parse address as string
      requiresArg:true
    },
    i:{
      demand:false,
      alias: 'ip',
      describe: 'Type in ip to geolocate an ip',
      string: true,
      requiresArg: true
    }
  }).command('where', 'Geolocate yourself')
  .help()//alias for help
  .alias('help', 'h')//help, and h as alias
  .argv;

//console.log(argv);


var searchByAddress = (geocodeUrl) => {
  axios.get(geocodeUrl).then((response)=>{
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find an address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/6953ec32700cc97bd56f8e8521a79247/${lat},${lng}?units=ca`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response)=>{
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`)
})
.catch((e)=>{
  if(e.code === 'ENOTFOUND'){
    console.log('Unable to connect to API servers.');
  }else{
    console.log(e.message);
  }
  console.log(e);
});
};

var findByIP = (ip) => {
  geo.getExtIP.then((res)=>{
    console.log(res);
    var lat = res.geo.ll[0];
    var lng = res.geo.ll[1];
    var weatherUrl = `https://api.darksky.net/forecast/6953ec32700cc97bd56f8e8521a79247/${lat},${lng}?units=ca`;
    //console.log(`The nearest location is ${res.geo.city}, ${res.geo.region}, ${res.geo.country}`);
    //console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  }).then((response)=>{
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
  }).catch((e)=>{
    if(e.code === 'ENOTFOUND'){
      console.log('Unable to connect to API servers.');
    }else{
      console.log(e.message);
    }
    console.log(e);
  });
};


if(argv.address){
  let encodedAddress = encodeURIComponent(argv.address);
  let searchByAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
  search(geocodeUrl);
}else if (argv.ip){
  let ipAddress = argv.ip;
  findByIP("108.170.137.191");
}

//load more information
//default location
