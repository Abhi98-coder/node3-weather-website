const request = require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/65caccabcb3c2f38ecdb0ab31dde7457/'+latitude+','+longitude
    request({url ,json: true},(error,{body})=>{
       if(error){
           callback('Unable to connect to forecast services!', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)    
        }  else{
            callback(undefined,body.daily.data[0].summary+" It is currently "+body.currently.temperature+" degrees out.")
        }
    })
}

module.exports=forecast