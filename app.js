const path=require('path')
const express=require('express')
const hbs = require('hbs')
const geocode=require('./src/geocode')
const forecast=require('./src/forecast')
const port =process.env.PORT || 3000
//making paths
const publicpath=path.join(__dirname,'./public')
const templatespath=path.join(__dirname,'./templates/views')
const partialspath=path.join(__dirname,'./templates/partials')


const app = express()

app.use(express.static(publicpath))

//for hbs
app.set('view engine','hbs')
app.set('views',templatespath)
hbs.registerPartials(partialspath)
//app.com
//app.com/help
//app.com/about


app.get('',(req,res)=>{
    res.render('index',{
        title : 'weather app',
        author : 'mickey '
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'reeeeeeeeeeeee',
        author : 'mickey '
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        author : 'mickey ',
        body : ' They ask you how you are and you have to say that you are fine but you are not really fne but they would never understand'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode.geocode(req.query.address,(error,{long, lat, place}={})=>{
        if(error)
        {
            return res.send({
                error
            })
        }
        else{

      
       
           forecast.forecast({long,lat},(error, data )=>{
            if(error)
            {
                return res.send({
                    error
                })}
                else
            res.send({data,
            place})
        })}
        
    
    })
})

app.get('/help/*',(req,res)=>{
    res.render('generic404',{
        title : 404,
        errortype:'Article not found',
        author : 'mickey'
    })

})



app.get('*',(req,res)=>{
    res.render('generic404',{
        title : 404,
        errortype:' not found',
        author : 'mickey'
    })

})
app.listen(port,()=>{
    console.log("tada !")
})
