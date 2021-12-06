var express = require('express');
var path = require('path');
const bodyParser=require("body-parser");
var router = express.Router();
const mongoose=require("mongoose");
const schema=require("../modules/schema");

var app = express()

// Schemas of DB's
const cartSchema=schema.cart_schema;

// Connection with different Db
const myShopping = mongoose.connection.useDb('myShopping');

// Some Common Model
var addToCartModel=myShopping.model("myshopping",cartSchema);

// Body Parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


router.get("/addToCart/:productId",(req,res)=>{
    let addNewProductTOCart=new addToCartModel({
        productId:req.params.productId,
        productName:req.query.pname,
        productImage:req.query.pimage,
        productPrice:req.query.pprice
    }) 
    addNewProductTOCart.save()
        .then(()=>{
            res.redirect("back");
        })
        .catch((err)=>{console.log(err.message)})
})

router.get("/deleteProduct/:productId",(req,res)=>{
    let deleteProductFromCart=addToCartModel.findOneAndDelete({productId:req.params.productId});
    deleteProductFromCart.exec()
        .then(()=>{
            res.redirect("back")
        })
        .catch((err)=>{console.log(err.message)})
})


module.exports=router;