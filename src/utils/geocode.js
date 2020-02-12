const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGFubm9uYiIsImEiOiJjazJtMXY0bG4wZDl4M2JvMzJwbzgyMjZiIn0.L2lbf9gVZLDFtL-Zx4tETQ&limit=1'  

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('unable to connect', undefined)
        } else if (body === 0) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, {
               lat: body.features[0].center[1],
               long: body.features[0].center[0],
               location: body.features[0].place_name
            })
        }
     
        
    })

}

module.exports = geocode