const yargs = require('yargs');
const search = require('./search/search');



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
    },
    f:{
      demand:false,
      alias: 'locate',
      describe: 'Find me',
      requiresArg: false
    }
  })
  .help()//alias for help
  .alias('help', 'h')//help, and h as alias
  .argv;



if (argv.f){
  search.findByGeo();
  }else if(argv.address){
  let encodedAddress = encodeURIComponent(argv.address);
  let geocode = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
  search.searchByAddress(geocode);
}else if (argv.ip){
  let ipAddress = argv.ip;
  search.findByIP(argv.ip);
  //findByIP("108.170.137.191");
}else{
  console.log("You haven't entered any flag. Type --help for more help.");
}

//Todo
//load more information
//default location -done
