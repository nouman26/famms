const mongoose=require("mongoose")
mongoose.connect('mongodb://m001-student:asdfghjkl@sandbox-shard-00-00.yaq2o.mongodb.net:27017,sandbox-shard-00-01.yaq2o.mongodb.net:27017,sandbox-shard-00-02.yaq2o.mongodb.net:27017/default?ssl=true&replicaSet=atlas-eo6vgu-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const cartSchema = new mongoose.Schema({
    productId:String,
    productImage:String,
    productName:String,
    productPrice:String
});

module.exports.cart_schema=cartSchema;