const express = require('express')
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes.js')
//exprss app
const  app = express();
const mongoURL ="mongodb+srv://geo:totoivy@cluster0.bpodhqs.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoURL)
.then((result) =>{app.listen(3000);})
.catch((err) => {console.log('err')})

//set view engine
app.set('view engine', 'ejs');

//listen for request
// app.listen(3000);
//middle ware and static files
app.use(express.static('public'))

app.use(express.urlencoded({extended:true}))

app.use(morgan('dev'));

// mongoose and mongo sandbox routes

// app.get('/add-blog', (req,res) =>{
//     const blog = new Blog({
//         title : "new blog",
//         snippet : "about my new blog",
//         body : "more about my blog"
//     });
//     blog.save()
//     .then((result) =>{
//         res.send(result)
//     })
//     .catch((err) =>{
//         console.log(err)
//     })
// })
// app.get('/all-blogs',(res,req) =>{
//     Blog.find()
//     .then((result) =>{
//         res.send(result)
//     })
//     .catch((err) =>{
//         console.log(err)
//     })
// })

// app.get('/single-blog',(req,res) =>{
//     Blog.findById('641334e6eeb66c479cf577c4')
//     .then((result) =>{
//         res.send(result)
//     })
//     .catch((err) =>{
//         console.log(err)
//     })
// })


app.get('/',(req,res) => {
//     const blogs = [
//         {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//         {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//         {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//       ];
//    // res.send('<p>home page</p>');
//    res.render('index',{title:'home',blogs});
res.redirect('/blogs')
})
app.get('/about',(req,res) => {
   // res.send('<p>about page</p>');
   res.render('about',{title:'about'})
})
//blog routes
app.use('/blogs',blogRoutes)

// //redirects
// app.get('/about-us',(req,res) =>{
//     res.redirect('about');
// })



//404 page
app.use((req,res) =>{
    res.status(404).render('404',{title:'404'});
})
