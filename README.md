# weatherApp
A weather app that can determine your geolocation and return the weather
## Options
  -a, --address  Address to fetch weather for                           [string]
  
  -i, --ip       Type in ip to geolocate an ip                          [string]
  
  -f, --locate   Find me
  
  --help, -h     Show help                                             [boolean]
  
## How To
### Address
--Resolves address and returns weather

node app.js --address="123 fake street, fake Province, fake Country"

### IP
--Resolves ip and returns weather

node app.js --ip="192.1.1.1"

### Locate
--Locates you on map and returns with weather for your area

node app.js --f

