const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')

const app = express()

const publicDir = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicDir))

app.get('', (req,res) => {
    res.render('index', {
        title:'Weather',
        name:'Hasan'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'About me',
        name: 'Hasan'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        name: 'Hasan',
        title: 'Help',
        helpText:'This ia a help message'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address){
        return res.send({
            error: 'Please provide the address'
        })
    } 

    geocode(req.query.address.toString(), (error, {latitude, longitude, place} = {}) => {
        if (error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: place,
                address: req.query.address
            })
          })
    })
})


app.get('*', (req,res) => {
    res.render('404', {
        name: 'Hasan',
        title: '404',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up!')
})