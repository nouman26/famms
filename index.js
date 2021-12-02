const express = require('express');
var path = require('path');
const bodyParser=require("body-parser");
const app = express();
var main=require("./routes/main")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body Parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use("/",main)

app.listen(process.env.PORT || 3000,()=>console.log("App is RUnning"))