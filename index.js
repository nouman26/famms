const express = require('express');
var path = require('path');
const bodyParser=require("body-parser");
const app = express();
var home=require("./routes/home")
var addToCart=require("./routes/add_to_cart")
var checkout=require("./routes/checkout")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body Parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use("/",home)
app.use("/",addToCart)
app.use("/",checkout)

app.listen(process.env.PORT || 3000,()=>console.log("App is RUnning"))