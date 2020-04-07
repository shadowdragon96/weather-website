const request = require('request')

const forecast=({long,lat},callback)=>
{
    const url ='https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&appid=68b205f4d453ee1bb36f367c9737839b&units=metric'
    request({url,json:true},(error,{body})=>
    {
        if(error)
        callback('unable to connect')
        else if(body.error)
        {

            callback('Coordinates invalid')
        }
        else
        {
            callback(undefined,
                 body.current.weather[0].description+', It is '+body.current.temp+' degrees ' +' but it feels like it is '+body.current.feels_like+' degrees '

            )
        }

    })
}
module.exports ={
    forecast:forecast
}
//  const url ='http://api.weatherstack.com/current?access_key=372e106c46c8c1efb98300839a90be51&query=37.8267,-122.4233?units=si'
//  request({url: url,json:true},
//      (error,response)=>{
//     if(error)
//     {
//         console.log('No connection')
//     }
//     else if(response.body.error)
//     {
//         console.log('invalid location')
    
//     }
//     else
//         console.log(response.body.current.weather_descriptions[0]+' '+response.body.current.temperature)
//     })
