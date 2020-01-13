const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

const port=process.env.PORT||3000
const hbs = require('hbs')
//Define path
const publicDir = (path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup Handle bar engine and views location
app.set('view engine', 'hbs') //setting handle bars
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDir))
//Setting up views here
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bilal Hussain'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bilal Hussain'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Bilal'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send("You must Provide an Address!")
    }
    const userLocation = req.query.address;
    geocode(userLocation, (error, { latitide, longitude, location }={}) => {
        if (error) {
            res.send({ error })
            return;
        }
        forecast(latitide + ',' + longitude, (error, forecstData) => {
            if (error) {
                res.send(error)
                return
            }

            res.send({
                forecstData,
                location,
                address: req.query.address
            });
        })

    })






})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page Not Found',
        name: 'Bilal'
    })
})
//Wild card
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        name: 'Bilal'
    })
})

// app.listen(3000, () => {
//     console.log("Server is Up on port 3000")
// });
app.listen(port, () => {
    console.log("Server is Up on port"+port)
});