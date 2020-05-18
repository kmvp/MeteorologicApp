/*
    Practica Aplicación Meteorológica con Node.JS
    Entrega: Karina M. Valdez P.
    No. Control: G1946019 
*/
const express = require('express')
const bodyParser=require('body-parser');
const request = require('request')
const app = express()
const translate = require('translate')
translate.engine = 'yandex'
translate.key = 'trnsl.1.1.20200504T063735Z.24589d8003959227.37c1a92d9512eb5fb889b2551a75871afb2b71f7'
//const geocodificacion = require("./app_geo")
//const pronostico = require("./app_pro")
//const PORT = 3000
// S e t t i n g s
app.set('port', 3000)
app.set('view engine', 'ejs')

// M i d d l e w a r e
function logger(req, res, next){
    console.log('Request received')
    console.log(`Route received: ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next()
}

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger)

// V a r s
var weather_description
var datac
var datal
var city

// R o u t e s
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/', (req, res) => {
    const url=`http://api.weatherstack.com/current?access_key=6134446f5a686e709de3199c8d98d3cd&query=${req.body.city}`
    request({url:url, json:true}, (error, response)=>{
        //weather_descript = response.body.current.weather_descriptions[0]
        //translate(weather_descript, {from: 'en', to:'es'}).then(text => {
        //    callback(undefined,{
        //        weather_descript: text,
                // temperature: response.body.current.temperature,
                // precipitation: response.body.current.precip,
                // temperature_feelslike: response.body.current.feelslike  
        //    })
            //console.log("El clima en " + response.body.location.name + ", " + response.body.location.country + " es " + text)
            // weather_description = text
            // datac = response.body.current
            // datal = response.body.location
            // city = req.body.city
            // res.redirect('/weather')
            
        //})
        //console.log(response)
        //poner la funcion aqui y luego crear una variable con el valor asignado para despues pasarlo a abajo
        weather_description = response.body.current.weather_descriptions[0]
        datac = response.body.current
        datal = response.body.location
        city = req.body.city
        long = response.body.location.lon
        lati = response.body.location.lat
        fechahora = response.body.location.localtime
        res.redirect('/weather')
        
    })
    //console.log(weather_description +", "+datac +", "+datal +", "+city)
})

app.get('/weather',(req,res)=>{  
    // aca en la siguiente linea
    res.render('weather.ejs', { city:city, datac:datac, datal:datal, weather_description:weather_description, long:long, lati:lati, fechahora:fechahora})
})

app.post('/weather',(req,res)=>{ 
    res.redirect('/')
})

app.use(express.static('public'))

app.listen(process.env.PORT, function() {
    //console.log('Server on port 3000 at http://localhost:', app.get('port'))
    console.log('Server on port 3000 at http://localhost:3000')
})