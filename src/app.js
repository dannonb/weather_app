const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const pubDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


// setup static directory to serve 
app.use(express.static(pubDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather application',
        name: 'dannon bigham'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: "dannon bigham,"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "hey this is the help page",
        title: 'help',
        name: 'dannon bigham'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please enter a location'
        })
    }

    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(lat, long, (error, forecastData) => {
            if (error) {
               return res.send({error}) 
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })

    // res.send({
    //     forecast: 'forecast',
    //     location: req.query.location,
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        message: "help error 404 from dan",
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        message: "error 404 from dan",
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})