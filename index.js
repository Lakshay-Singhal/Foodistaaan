var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const axios = require('axios');
var yahooStockPrices = require('yahoo-stock-prices');
const app = express();


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static("public"))


app.get('/', (req,res)=>{
    
    return res.render('index')
})

app.get('/index', (req,res)=>{
    
    return res.render('index')
})
app.get('/about', (req,res)=>{
    
    return res.render('about')
})
app.get('/error', (req,res)=>{
    
    return res.render('404')
})
app.get('/blog-single', (req,res)=>{
    
    return res.render('blog-single')
})
app.get('/blog1', (req,res)=>{
    
    return res.render('blog1')
})
app.get('/blog2', (req,res)=>{
    
    return res.render('blog2')
})
app.get('/cart', (req,res)=>{
    
    return res.render('cart')
})
app.get('/checkout', (req,res)=>{
    
    return res.render('checkout')
})
app.get('/checkout-step2', (req,res)=>{
    
    return res.render('checkout-step2')
})
app.get('/checkout-step3', (req,res)=>{
    
    return res.render('checkout-step3')
})
app.get('/contact', (req,res)=>{
    
    return res.render('contact')
})
app.get('/faqs', (req,res)=>{
    
    return res.render('faqs')
})
app.get('/profile', (req,res)=>{
    
    return res.render('profile')
})
app.get('/restaurant-details', (req,res)=>{
    
    return res.render('restaurant-details')
})
app.get('/restaurants', (req,res)=>{
    
    return res.render('restaurants')
})
app.get('/sign-in', (req,res)=>{
    
    return res.render('sign-in')
})
app.get('/sign-up', (req,res)=>{
    
    return res.render('sign-up')
})
app.get('/testimonials', (req,res)=>{
    
    return res.render('testimonials')
})
app.get('/blog-a', (req,res)=>{
    
    return res.render('blog-a')
})
app.get('/blog-b', (req,res)=>{
    
    return res.render('blog-b')
})
app.get('/blog-c', (req,res)=>{
    
    return res.render('blog-c')
})


app.post('/index',async(req, res)=>{
    const obj = {
        'email': req.body.email,
    }
    const response = await axios.post('https://foodistaan-48b48-default-rtdb.firebaseio.com/newsletterInfo.json', obj);
    // console.log(response);
    return res.redirect("index");

})





app.post('/contact',async(req, res)=>{
    const obj = {
        'email': req.body.email,
        'name': req.body.name,
        'message': req.body.message,

    }
    const response = await axios.post('https://foodistaan-48b48-default-rtdb.firebaseio.com/contactUsInfo.json', obj);
    // console.log(response);
    return res.redirect("index");

})




app.post('/sign-in',async(req, res)=>{
    const response = await axios.get('https://foodistaan-48b48-default-rtdb.firebaseio.com/userInfo.json');
    console.log(response.data);
    for(var key in response.data)
    {
        var user = response.data[key];
        if(user.email === req.body.name || user.firstname === req.body.name && user.password === req.body.password)
        {
            return res.redirect("index");

            
        }
    } 
})

app.post('/sign-up',async(req, res)=>{
    console.log(req.body);
    if(req.body.email === null || req.body.email.trim().length === 0)
    {
        console.log('Name should not be empty');
        return;
    }
    if(req.body.password === null || req.body.password.trim().length === 0)
    {
        console.log('Password should not be empty');
        return;
    }
    if(req.body.password != req.body.confirmpassword)
    {
        console.log('Passwords do not match');
        return;
    }
    

    const obj = {
        'email': req.body.email,
        'password': req.body.password,
        'phone': req.body.phone,
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
    }
    const response = await axios.post('https://foodistaan-48b48-default-rtdb.firebaseio.com/userInfo.json', obj);
    // console.log(response);
    return res.redirect("sign-in");
})

app.listen(5000,()=>{
    console.log("Server started");
})