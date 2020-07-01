const request=require('request')
const forecast=(latitude,longitude,callback)=>{
  const url='https://samples.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=5a5482fb95fc61c690d4586301209bef'
  request({url,json:true},(error,{body}={})=>{
      if(error){
          callback('Unable to connect to weather service!',undefined)
      }else if(body.error){
        callback('Unable to find location!',undefined)
     }else{//body.weather[0].description+ '  Temprature:'+body.main.temp+'   Humidity:'+body.main.humidity+'  Pressure:'+body.main.pressure
      const obj={
        description:'Description: '+body.weather[0].description,
        temprature:'Temprature: '+body.main.temp,
        humidity:'Humidity: '+body.main.humidity,
        pressure:'Pressure: '+body.main.pressure,
        sea_level:'Sea_level: '+body.main.sea_level,
        
      }
      
     callback(undefined,obj)
     }
  })
}
module.exports=forecast 