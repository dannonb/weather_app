const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/ab09e657a738cd48f6b3b78a1a659969/' + lat + ',' + long + ''


    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('cant connect to weather service', undefined)
        } else if (body.error) {
            callback('cannot find coordinates', undefined)
        } else {
            callback(undefined, {
                location: body.timezone,
                weather: body.currently.summary,
                temp: body.currently.temperature,
                high: body.daily.data[0].temperatureHigh,
            })
        }
    })
    
}

module.exports = forecast