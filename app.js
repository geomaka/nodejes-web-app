const express = require('express')
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes.js')
const dotenv = require('dotenv')

dotenv.config()

//express app
const  app = express();
const port = process.env.PORT || 3000

mongoose.connect(process.env.mongoURL)
.then((result) =>{app.listen(port);
    console.log(`app is running on : http://localhost:${port}/blogs`)
})
.catch((err) => {console.log('Not connected,',err)})

//set view engine
app.set('view engine', 'ejs');

//listen for request
// app.listen(3000);
//middle ware and static files
app.use(express.static('public'))

app.use(express.urlencoded({extended:true}))

app.use(morgan('dev'));

app.get('/',(req,res) => {
res.redirect('/blogs')
})
app.get('/about',(req,res) => {
   res.render('about',{title:'about'})
})
//blog routes
app.use('/blogs',blogRoutes)

//404 page
app.use((req,res) =>{
    res.status(404).render('404',{title:'404'});
})
