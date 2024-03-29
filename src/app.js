const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

app.use(express.static(path.join(__dirname,'../public')))

app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

 app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Abhi'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Abhi'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name:'Abhi',
        helpText: 'Helpful Text'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Provide Address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        
        
        forecast(latitude,longitude, (error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            
        })
    })



})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Abhi',
        errorMessage:'404 HELP ARTICLE NOT FOUND '
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Abhi',
        errorMessage:'404 NOT FOUND '})
})
app.listen(port,()=>{
    console.log('Server is up on port' + port)
})