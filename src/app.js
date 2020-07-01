const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port =process.env.PORT ||3000
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Riya Bhardwaj'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Riya Bhardwaj'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText:'This is some helpful text.',
        name: 'Riya Bhardwaj'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
             
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address:req.query.address
    // })


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Riya Bhardwaj',
        errorMessage:'Help article not found.'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Riya Bhardwaj',
        errorMessage:'Page not found .'
    })
})

app.listen(port, () => {
    console.log('Server is up on port'+port)
})