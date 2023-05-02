const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const { connectDB } = require('./server/database/connection')
const path = require('path')
const cookieParser = require('cookie-parser')

// setting dotenv
dotenv.config({path:'config.env'})
const PORT = process.env.PORT

// Express app
const app = express();

// Morgan connect
app.use(morgan('tiny'));

//Load Database
connectDB();

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

// view engine
app.set('view engine','ejs')

// load assests
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/',require('./server/routes/userRoutes'))
app.use('/',require('./server/routes/blogRoutes'))

// Start the server
app.listen(PORT,(err)=>{
    if(!err){
        console.log(`Server Running on ${PORT}`)
    }
    else{
        console.log("Server connection error")
    }
})
