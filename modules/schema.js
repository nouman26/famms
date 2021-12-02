const mongoose=require("mongoose")
// mongoose.connect('mongodb://localhost:27017/default', {useNewUrlParser: true, useUnifiedTopology: true,'useFindAndModify': false});
// mongoose.connect('mongodb+srv://m001-student:asdfghjkl@sandbox.yaq2o.mongodb.net/default?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb://m001-student:asdfghjkl@sandbox-shard-00-00.yaq2o.mongodb.net:27017,sandbox-shard-00-01.yaq2o.mongodb.net:27017,sandbox-shard-00-02.yaq2o.mongodb.net:27017/default?ssl=true&replicaSet=atlas-eo6vgu-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const cartSchema = new mongoose.Schema({
    productId:String,
    productImage:String,
    productName:String,
    productPrice:String
});

module.exports.cart_schema=cartSchema;