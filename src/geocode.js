const request = require('request')
const geocode=(place,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(place)+'.json?access_token=pk.eyJ1Ijoic2hhZG93ZHJhZ29uIiwiYSI6ImNrOG9udHRxbTA5ZjMzbXQybDRjcW9mNTYifQ.rlTNcfQI7I6ENz7rqUuJcw&limit=1'
    request({url,json:true},(error,{body})=>
    {
        if(error)
       callback('unable to connect')
     else if(body.features.length==0)
     callback('invalid location')
     else{
         callback(undefined,{long : body.features[0].center[0],
            lat : body.features[0].center[1],
            place : body.features[0].place_name})
        

        }
      

    })
}
module.exports ={
    geocode:geocode
}