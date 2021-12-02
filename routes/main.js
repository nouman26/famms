var express = require('express');
var path = require('path');
const nodemailer=require("nodemailer");
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


router.get("/",(req,res)=>{
    var totalItemsInCart = myShopping.collection("myshoppings");
    totalItemsInCart.countDocuments({},function(err,count){
            res.render("home",{itemsInCart:count});
        })
    
})


router.get("/addToCart/:productId",(req,res)=>{
    let addNewProductTOCart=new addToCartModel({
        productId:req.params.productId,
        productName:req.query.pname,
        productImage:req.query.pimage,
        productPrice:req.query.pprice
    }) 
    addNewProductTOCart.save(function(){
        res.redirect("back");
    });
})

router.get("/checkout",(req,res)=>{
    let findProductInCart=addToCartModel.find();
    findProductInCart.exec((err,data)=>{

        res.render("checkout",{items:data});
    })
    
})

router.get("/deleteProduct/:productId",(req,res)=>{
    let deleteProductFromCart=addToCartModel.findOneAndDelete({productId:req.params.productId});
    deleteProductFromCart.exec(function(){
        res.redirect("back")
    });
})

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "noumanarain0@gmail.com",
        pass: "03022106768"
    }
});


router.post('/checkout',function(req,res){
    var from={
        name: 'Famms',
        address: 'noumanarain0@gmail.com'
    }
    var mailOptions={
        from: from,
        to : req.body.email,
        subject : "Commerce Website",
        html: `<body style="background-color: #101b31">
        <div style="text-align: center;">
          <h2 style="font-size: 45px; color: #53beec; padding-top: 60px; font-family: sans-serif; margin-bottom: 0px;" >Famms</h2>
        </div>
        <div style="text-align: center; width: 100%; margin-right: auto; margin-left: auto;">
          <div style="color: white; border-radius: 6px; margin-bottom: 30px; padding: 30px 30px;">
                <h3 style="color: white; font-size: 24px; margin-bottom: 10px; font-family: sans-serif;
                          font-weight: 500;" >Hi,</h3>
    
                <p style="color: white; font-size: 20px; margin-top: 20px; margin-bottom: 10px; font-family: sans-serif;
                          font-weight: 500;" >Thank You for shopping Our Website!,</p>
    
                <p style="color: white; font-size: 20px; margin-top: 20px; margin-bottom: 10px; font-family: sans-serif;
                          font-weight: 500;" >Total ${req.body.totalItem} Items you  ordered</p>

                <p style="color: white; font-size: 20px; margin-top: 20px; margin-bottom: 10px; font-family: sans-serif;
                          font-weight: 500;" >Please be ready for delivery with cash $ ${req.body.totalPrice}</p>
      
                <h3 style="color: white ;font-size: 28px; margin-top: 20px; margin-bottom: 10px; font-family: sans-serif;
                          font-weight: 500;" ></h3>
    
                <p style="color: white; font-size: 17px; margin-top: 20px; margin-bottom: 10px; font-family: sans-serif;
                font-weight: 500;" >Regards Famms</p>
          </div>
        </div>
</body>`
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
          res.end("error");
        }
        else{
            myShopping.dropCollection("myshoppings", function (err, result) {
                res.send("Ordered Confirmed")
                res.end()
            })
        }
    });
});

module.exports=router;