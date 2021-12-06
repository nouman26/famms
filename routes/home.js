var express = require('express');
var path = require('path');
const bodyParser=require("body-parser");
var router = express.Router();
const mongoose=require("mongoose");

var app = express()

// Connection with different Db
const myShopping = mongoose.connection.useDb('myShopping');

// Body Parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

router.get("/",(req,res)=>{
    var totalItemsInCart = myShopping.collection("myshoppings");
    totalItemsInCart.countDocuments({})
        .then((count)=>{
            res.render("home",{itemsInCart:count});
        })
        .catch((err)=>{console.log(err.message)})
    
})

module.exports=router;