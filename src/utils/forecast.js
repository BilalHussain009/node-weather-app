const request=require('request');
const forecast=(coordinates,callback)=>{
    console.log(coordinates);
    const url = 'https://api.darksky.net/forecast/bda199264aa2cad3a3d7493a513bcb68/'+encodeURIComponent(coordinates)+'?units=si';
    request({ url, json: true }, (error, {body}) => {
          if (error) {
             callback('Unable to connect to server',undefined);
          }
          else if (body.error) {
            callback("Unable to find location",undefined);
          }
          else {
             callback(undefined,body.daily.summary+ ' And its currently '+body.currently.temperature+' Degree Celcius'
             )
          }
       })
 }
module.exports=forecast;