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
 app.post('/login', function(req,res){

   
            return res.redirect('logout.html');}
          
 )
app.get('/',function(req,res){
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.redirect('index.html');
}).listen(3000)

console.log("server listening at port 3000");