var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
const { Console } = require("console");
const { compile } = require("proxy-addr");
mongoose.connect('mongodb://localhost:27017/tutorialsPoint');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
})
var app=express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: true
}));

app.post('/sign_up', function(req,res){

   var email =req.body.email;
   var pass = req.body.password;
   

   var data = {
      
      "email":email,
      "password":pass
   }
   db.collection('details').insertOne(data,function(err, collection){
   if (err) throw err;
      console.log("Record inserted Successfully");
   });
   return res.redirect('success.html');
})
app.post('/login', function(req,res){

    var email =req.body.email;
    var pass = req.body.password;
    
 
    var data = {
       
       "email":email,
       "password":pass
    }
    var i=0
    db.collection('details').find().toArray(function(err, items) {
        if(err) throw err;    
        items.forEach(element => { 
         
            if(element.email===email){
            console.log("AAAAAAAAAA")
                if(element.password===pass)
                i=1 
            }
          });         
    });
    setTimeout(()=>{
        if(i===0){
            console.log(i)
            return res.redirect('error.html');}
            else
            res.redirect('home.html');
    },2000);
  
 })
 
app.get('/',function(req,res){
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.redirect('index.html');
}).listen(3000)

app.post('/depertment', function(req,res){

   var name =req.body.name;
  
  

   var data = {
      
      "name":name
   }
   db.collection('dept').insertOne(data,function(err, collection){
   if (err) throw err;
      console.log("Record inserted Successfully");
   });
   return res.send('successfully Added');
})
app.get('/depertment', function(req,res){

 
  db.collection('dept').find().toArray(function(err, items){
   if (err) throw err;
   return res.send(items);
   });
  
})
app.delete('/depertment', function(req,res){
   var name =req.body.name;
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutorialsPoint");
  var myquery = { name: name };
  dbo.collection("dept").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
    return res.send('1 document deleted');
  });
});
   
 })

 app.put('/depertment', function(req,res){
   var name =req.body.name; var name1 =req.body.name1;
  
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutorialsPoint");
  var myquery = { name: name };
  var newvalues = { $set: {name: name1} };
  dbo.collection("dept").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
    
  });

  return res.send('1 document updated');
});
   
 })
app.post('/student', function(req,res){

   var name =req.body.name;
   var address =req.body.address;
   

   var data = {
      
      "name":name,
      "address":address
   }
   db.collection('student').insertOne(data,function(err, collection){
   if (err) throw err;
      console.log("Record inserted Successfully");
   });
   return res.send('successfully Added');
})
app.get('/student', function(req,res){

 
  db.collection('student').find().toArray(function(err, items){
   if (err) throw err;
   return res.send(items);
   });
  
})

app.delete('/student', function(req,res){
   var name =req.body.name;
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutorialsPoint");
  var myquery = { name: name };
  dbo.collection("student").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
    return res.send('1 document deleted');
  });
});
   
 })

 app.put('/student', function(req,res){
   var name =req.body.name; var name1 =req.body.name1;
   var address =req.body.address;
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutorialsPoint");
  var myquery = { name: name };
  var newvalues = { $set: {name: name1, address: address } };
  dbo.collection("student").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
    
  });

  return res.send('1 document updated');
});
   
 })

 app.post('/teacher', function(req,res){

   var name =req.body.name;
   var address =req.body.address;
   

   var data = {
      
      "name":name,
      "address":address
   }
   db.collection('teacher').insertOne(data,function(err, collection){
   if (err) throw err;
      console.log("Record inserted Successfully");
   });
   return res.send('successfully Added');
})
app.get('/teacher', function(req,res){

 
  db.collection('teacher').find().toArray(function(err, items){
   if (err) throw err;
   return res.send(items);
   });
  
})

app.delete('/teacher', function(req,res){
   var name =req.body.name;
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutorialsPoint");
  var myquery = { name: name };
  dbo.collection("teacher").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
    return res.send('1 document deleted');
  });
});
   
 })

 app.put('/teacher', function(req,res){
   var name =req.body.name; var name1 =req.body.name1;
   var address =req.body.address;
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutorialsPoint");
  var myquery = { name: name };
  var newvalues = { $set: {name: name1, address: address } };
  dbo.collection("teacher").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
    
  });

  return res.send('1 document updated');
});
   
 })





console.log("server listening at port 3000");