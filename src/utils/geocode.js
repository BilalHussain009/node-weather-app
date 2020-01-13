const request=require('request');
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYmlsYWxodXNzYWluMjAwIiwiYSI6ImNrNTNpMHh4aTAwNW8za3JqbWJ4aTIzNWYifQ.39dSxB3xL03YqDUwZ6kq4A&limit=2';
    request({url,json:true},(error,{body})=>{
       if(error){
          callback('unable to connect ot services',undefined)
       }
       else if(body.features.length===0){
          callback('Unable to find location try again!',undefined)
       }

       else{
          callback(undefined,{
             latitide:body.features[0].center[1],
             longitude:body.features[0].center[0],
             location:body.features[0].place_name
          })
       }
    })
 }
 module.exports=geocode