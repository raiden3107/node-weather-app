const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a794b166df96ec095c2d51fb010c4392/' + latitude + ',' + longitude + '?units=si'
    request({ url, json:true }, (error, {body}) => {
        if (error){
            callback('Unale to fetch weather services',undefined)
        } else if (body.code){
            callback('Unable to find location',undefined)
        } else{
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress celsius ' + ' and ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast