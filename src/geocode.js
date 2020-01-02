
const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicmFpZGVuMzEwNyIsImEiOiJjazRzZnU5d2owNGgzM2tvd20zbXF1bDBiIn0.J3n-gT_JrdqycroD-maQAg'
    request({ url, json:true }, (error, {body}) => {
        if (error){
            callback('Unable to fetch geo services')
        } else if (body.features.length === 0){
            callback('Unable to find results')
        } else{
            callback(undefined,
                {
                    longitude: body.features[0].center[0],
                    latitude: body.features[0].center[1],
                    place: body.features[0].place_name
                }
            )
        }
    })
}

module.exports = geocode