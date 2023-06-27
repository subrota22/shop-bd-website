
require("dotenv").config() ;
const express = require("express") ;
const cors = require('cors');
const jwt = require("jsonwebtoken") ;
const app = express() ;
const port = process.env.PORT || 3032 ;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//middle ware 
app.use(cors()) ;
app.use(express.json()) ;

app.listen(port , (req , res) => {
console.log(`Your server runing on port ${port}`)
})
//require('crypto').randomBytes(80).toString('hex') ; --> make a jwt by node <--
const jwtVerifyByToken = (req , res , next) => {
const getToken = req.headers.authorization ;
if(!getToken) {
return res.status(401).send({message:"unauthorize access to invalid token"}) ;
}
const token = getToken.split(' ')[1] ;
jwt.verify(token , process.env.SECRET_KEY , function (error , decoded) {
if(error) {
// res.send(error) ;
}
req.decoded = decoded ;
next() ;
} )
}
const run = async ()  =>  {
try {
const username = process.env.MONGODB_USERNAME ;
const password = process.env.MONGODB_PASSWORD ;

const uri = `mongodb+srv://${username}:${password}@cluster0.csbz0cb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//products collections 
const productsCollections = client.db("shopping-bd").collection("products") ;
//get all products
app.get("/products"  , jwtVerifyByToken , async(req , res ) => {
// const email = req.body.email;
// console.log(email);
// if(email!== req.decoded.email){
// return res.status(403).send({message:'unauthorize access'}) ;
// }
const page = parseInt(req.query.page) ;
const size = parseInt(req.query.size );
const query = {} ;
const cursor = await productsCollections.find(query);
const count = await productsCollections.estimatedDocumentCount() ;
const products  = await cursor.skip(page * size).limit(size).toArray() ;
res.send({count , products}) ;
}) 
//post data to find shopping cart

app.post("/productsById" , async(req , res) => {
const productsCartIdInfo = req.body ;
const objectIds = productsCartIdInfo.map(producId =>  ObjectId(producId))
const query = {_id : {$in:objectIds } } ;
const cursor = productsCollections.find(query) ;
const result = await cursor.toArray() ;
res.status(201).send(result) ; 
})  
//post jwt token
app.post("/json-webtoken" , (req , res) => {
const userEmail = req.body ;
const newToken = jwt.sign(userEmail , process.env.SECRET_KEY , {expiresIn:"1h"})
res.send({newToken})
})
//------- new ? 

} catch (error) { 
console.log(error);
}
finally {
//ok keep it up
}
}
run().catch((error) => console.log(error))
app.get("/" , (req , res) => {
res.send("Hello friend") ;
})