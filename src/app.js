const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

const port = process.env.PORT || 3000;
//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs');
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/',(req,res)=>{
  res.render('index.hbs',{
    title:'Weather',
    name:'Andrew'
  })
})

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
   title:'About',
   name:'Andrew'
  })
})

app.get('/help',(req,res)=>{
  res.render('help.hbs',{
   title:'Help Page',
   name:'Andrew',
   helpText:'This is some helpful page'
  })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:'Please provide an address'
    })
  }else{
    geocode.geocode(req.query.address,(error,data)=>{
  if(error){
    return res.send({
      errorMessage:error
    })
  }
    forecast.forecast(data.latitude,data.longitude, (error, forecastData) => {
      if(error){
        return res.send({
          errorMessage:error
        })
      }
    res.send({
      location:data.location,
      forecast:forecastData,
      address:req.query.address
    })
    })
  })
  }
})

app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send({
      error:'You must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products:[]
  })
})

app.get('/help/*',(req,res)=>{
  res.render('404.hbs',{
    title:'404',
    name:'Andrew Mead',
    errorMessage:'Help article not found'
  })
})

app.get('*',(req,res)=>{
  res.render('404.hbs',{
    title:'404',
    name:'Andrew Mead',
    errorMessage:'Page not found'
  })
})

app.listen(port,()=>{
  console.log(`Server is up on port ${port}`)
})
