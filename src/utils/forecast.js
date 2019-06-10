const request = require('request');

const forecast = (lat,long,callback) => {
  const url = `https://api.darksky.net/forecast/00551baf49f32e4fef4d14c976669da9/${lat},${long}`
  request({
    url:url,
    json:true
  },(error,response) => {
    if(error){
      callback('Unable to connect to weather service',undefined)
    }else if(response.body.error){
      callback('Unable to find the location',undefined)
    }else{
      callback(undefined,`${response.body.daily.data[0].summary} It is  currently ${response.body.currently.temperature} out.There is a ${response.body.currently.precipProbability}% chance of rain`)
    }
  })
}

module.exports = {
  forecast
};
