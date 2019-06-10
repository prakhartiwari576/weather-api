const request = require('request');

const geocode = (address,callback) =>{
  var encodedAddress = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoicHJha2hhcnRpd2FyaTU3NiIsImEiOiJjanUxZnR5aHowMTY1NDNxY2drMWQyN3NvIn0.ss7pYnTlsLBdy8MHd7lcPw&limit=1`

  request({
    url:url,
    json:true
  },(error,response) =>{
    if(error){
      callback('Unable to connect to location services',undefined)
    }else if(response.body.features.length === 0){
      callback('Unable to find that location.Try another search',undefined)
    }else{
     callback(undefined,{
        longitude:response.body.features[0].center[0],
        latitude:response.body.features[0].center[1],
        location:response.body.features[0].place_name

     })
    }
  })
}

module.exports = {
  geocode
};
