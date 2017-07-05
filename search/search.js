const axios = require('axios');
const geo = require("../geoLocationUtil/geo");

var searchByAddress = (geocodeUrl) => {
  axios.get(geocodeUrl).then((response)=>{
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find an address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/6953ec32700cc97bd56f8e8521a79247/${lat},${lng}?units=ca`;
  console.log(`Your address is: ${response.data.results[0].formatted_address}`);
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

var findByGeo = ()=> { geo.getExtIP.then((res)=>{
    //console.log(res);
    var lat = res.geo.ll[0];
    var lng = res.geo.ll[1];
    var weatherUrl = `https://api.darksky.net/forecast/6953ec32700cc97bd56f8e8521a79247/${lat},${lng}?units=ca`;
    console.log(`The nearest location is ${res.geo.city}, ${res.geo.region}, ${res.geo.country}`);
    //console.log(res.data.results[0].formatted_address);
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

var findByIP = (ip) =>{
  geo.getLocation(ip).then((res)=>{
    var lat = res.geo.ll[0];
    var lng = res.geo.ll[1];
    var weatherUrl = `https://api.darksky.net/forecast/6953ec32700cc97bd56f8e8521a79247/${lat},${lng}?units=ca`;
    console.log(`The nearest location is ${res.geo.city}, ${res.geo.region}, ${res.geo.country}`);
    //console.log(res.data.results[0].formatted_address);
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

module.exports ={
  searchByAddress,
  findByGeo,
  findByIP
}
