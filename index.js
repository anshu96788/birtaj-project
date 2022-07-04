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
app.set('view engine', 'ejs');
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
app.post('/sign_upstu', function(req,res){

  var email =req.body.email;
  var pass = req.body.password;
  var roll= req.body.roll;
  

  var data = {
     "roll": roll,
     "email":email,
     "password":pass
  }

  var i=0
  db.collection('student').find().toArray(function(err, items) {
      if(err) throw err;    
      items.forEach(element => { 
       
          if(element.roll===roll){
             if(element.email===email)
              i=1 
          }
        });         
  });
  setTimeout(()=>{
      if(i===0){
          console.log(i)
          return res.redirect('error3.html');}
          else
          {
            console.log(i)
            var j=0
            db.collection('details').find().toArray(function(err, items) {
                if(err) throw err;    
                items.forEach(element => { 
                 
                    if(element.roll===roll){
                       
                        j=1 
                    }
                  });         
            });
            setTimeout(()=>{
                if(j>0){
                    console.log(j)
                    return res.redirect('error2.html');}
                    else
                    {
                      
                      db.collection('details').insertOne(data,function(err, collection){
                        if (err) throw err;
                           console.log("Record inserted Successfully");
                        });
                        return res.redirect('success.html');
                    }
                  
            },2000);
          
          }
        
  },2000);

})

app.post('/sign_upfac', function(req,res){

  var email =req.body.email;
  var pass = req.body.password;
  var roll= req.body.roll;
  

  var data = {
     "roll": roll,
     "email":email,
     "password":pass
  }

  var i=0
  db.collection('teacher').find().toArray(function(err, items) {
      if(err) throw err;    
      items.forEach(element => { 
       
          if(element.roll===roll){
             if(element.email===email)
              i=1 
          }
        });         
  });
  setTimeout(()=>{
    console.log("JHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
      if(i===0){
          console.log(i)
          return res.redirect('errorte.html');}
          else
          {
            console.log(i)
            var j=0
            db.collection('details').find().toArray(function(err, items) {
                if(err) throw err;    
                items.forEach(element => { 
                 
                    if(element.roll===roll){
                       
                        j=1 
                    }
                  });         
            });
            setTimeout(()=>{
                if(j>0){
                    console.log(j)
                    return res.redirect('errortea2.html');}
                    else
                    {
                      
                      db.collection('details').insertOne(data,function(err, collection){
                        if (err) throw err;
                           console.log("Record inserted Successfully");
                        });
                        return res.redirect('success.html');
                    }
                  
            },2000);
          
          }
        
  },2000);

})
app.post('/login', function(req,res){

    var email =req.body.roll;
    var pass = req.body.password;
    var type=req.body.type;
    if(type==="Admin")
    { 
       if(email==="admin@work.com")
 {
    if(pass==="Password")
    {
      res.redirect('home.html');
    }
 }
 }
  var data = {
       
       "email":email,
       "password":pass
    }
    var i=0
    db.collection('details').find().toArray(function(err, items) {
        if(err) throw err;    
        items.forEach(element => { 
         
            if(element.roll===email){
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
            {
               if(type==="Student")
               res.render('studenhom', { title: 'User List', userData: email});
               else if(type==="Teacher")
               res.render('teahom', { title: 'User List', userData: email});
               else
               return res.redirect('error.html');
            }
          
    },2000);
  
 })

app.get('/',function(req,res){
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.redirect('index.html');
}).listen(3000)


app.get('/dept/edit/:id', function(req,res){
  var name1 = req.url.split("/")
  var name =name1[name1.length-1]
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
  //  console.log(req.url)
app.post('/depertment', function(req,res){
   var i=0;
   var course =req.body.course;
   var name =req.body.name;
   var data = {  
      "name":name,
      "course":course
   }
   db.collection('dept').insertOne(data,function(err, collection){
   if (err) throw err;
  i=1
   });
   if(i==0)
 return  res.redirect('home.html');
 else
 return res.redirect('error1.html');
})
app.get('/depertment', function(req,res){

 
  db.collection('dept').find().toArray(function(err, items){
   if (err) throw err;
   res.render('depertment', { title: 'User List', userData: items});
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
   var name =req.body.name; var name1 =req.body.name1;var course =req.body.course;
  
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutorialsPoint");
  var myquery = { name: name };
  var newvalues = { $set: {name: name1,course: course} };
  dbo.collection("dept").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
    
  });

  return res.send('1 document updated');
});
   
 })

 app.get('/student/edit/:id', function(req,res){
  var name1 = req.url.split("/")
  var name =name1[name1.length-1]
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
       // return res.send('1 document deleted');
  
      });
    });
  })

app.get('/student1', function(req,res){

  db.collection('student').find().toArray(function(err, items){
     if (err) throw err;
     res.render('student1', { title: 'User List', userData: items});
     // return res.send(items);
  });
})
app.post('/studenta', function(req,res1){

  
   var roll =req.body.roll; var course =req.body.course;var email =req.body.email;
   var address =req.body.address;

   console.log(roll);
var myquery = { roll: roll };
var newvalues = { $set: { address: address,email:email,course:course } };
db.collection("student").updateOne(myquery, newvalues, function(err, res) {
  if (err) throw err;
  return  res1.redirect('student.html');
  
  
});
 })

app.post('/student', function(req,res){
   var i=0;
   var name =req.body.name;
   var address =req.body.address;
 var email =req.body.email;
 var course =req.body.course;
   
var roll= req.body.roll;
   var data = {
      "roll": roll,
      "name":name,
      "address":address,
      "email":email,
      "course":course
   }
   db.collection('student').insertOne(data,function(err, collection){
   if (err) throw err;
      i=1
         });
         if(i==0)
         return  res.redirect('home.html');
         else
         return res.redirect('error1.html');
         })
app.get('/student', function(req,res){

 
  db.collection('student').find().toArray(function(err, items){
   if (err) throw err;
   res.render('student', { title: 'User List', userData: items});
   // return res.send(items);
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


 app.get('/teacher/edit/:id', function(req,res){
  var name1 = req.url.split("/")
  var name =name1[name1.length-1]
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
       // return res.send('1 document deleted');
  
      });
    });
  })

 app.post('/teacher', function(req,res){
   var i=0;
   var name =req.body.name;
   var address =req.body.address;
   var roll =req.body.roll;
   var salary =req.body.salary;var email =req.body.email;
   var data = {
      "roll":roll,
      "name":name,
      "address":address,"email":email,"salary":salary
   }
   db.collection('teacher').insertOne(data,function(err, collection){
   if (err) throw err;
      i=1
         });
         if(i==0)
         return  res.redirect('home.html');
         else
         return res.redirect('error1.html');
         })
app.get('/teacher', function(req,res){

 
  db.collection('teacher').find().toArray(function(err, items){
   if (err) throw err;
   res.render('teacher', { title: 'User List', userData: items});
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
   var name =req.body.name; var name1 =req.body.name1; var name =req.body.name;
   var address =req.body.address;
   var email =req.body.email;var salary =req.body.salary;
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutorialsPoint");
  var myquery = { name: name };
  var newvalues = { $set: {name: name1, address: address , email:email,salary:salary} };
  dbo.collection("teacher").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
    
  });

  return res.send('1 document updated');
});
   
 })


 app.get('/addmission/edit/:id', function(req,res){
  var course1 = req.url.split("/")
  var course =course1[course1.length-1]
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
     if (err) throw err;
      var dbo = db.db("tutorialsPoint"); 
      var myquery = { course: course };
      dbo.collection("addmission").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
          console.log("1 document deleted");
          db.close();
       // return res.send('1 document deleted');
  
      });
    });
  })


 app.post('/addmission', function(req,res){
   var i=0;
   var course =req.body.course;
   var fee =req.body.fee;
   var data = {  
      
      "course":course,
      "fee":fee
   }
   db.collection('addmission').insertOne(data,function(err, collection){
   if (err) throw err;
      i=1
         });
         if(i==0)
         return  res.redirect('home.html');
         else
         return res.redirect('error1.html');
         })
app.get('/addmission', function(req,res){

 
  db.collection('addmission').find().toArray(function(err, items){
   if (err) throw err;
   res.render('admission', { title: 'User List', userData: items});
   });
  
})

app.get('/addmission1', function(req,res){

 
  db.collection('addmission').find().toArray(function(err, items){
   if (err) throw err;
   res.render('admission1', { title: 'User List', userData: items});
   });
  
})

app.delete('/addmission', function(req,res){
   var course =req.body.course;
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutorialsPoint");
  var myquery = { course: course };
  dbo.collection("addmission").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
    return res.send('1 document deleted');
  });
});
   
 })

 app.put('/addmission', function(req,res){
   var course =req.body.course; var course1 =req.body.course1;var fee =req.body.fee;
  
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutorialsPoint");
  var myquery = { course: course };
  var newvalues = { $set: {course: course1,fee: fee} };
  dbo.collection("addmission").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
    
  });

  return res.send('1 document updated');
});
   
 })

 app.get('/assignment/edit/:id', function(req,res){
  var aname1 = req.url.split("/")
  var aname =aname1[aname1.length-1]
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
     if (err) throw err;
      var dbo = db.db("tutorialsPoint"); 
      var myquery = { aname: aname };
      dbo.collection("assignment").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
          console.log("1 document deleted");
          db.close();
       // return res.send('1 document deleted');
  
      });
    });
  })

 app.post('/assignment', function(req,res){
   var i=0;
   var aname =req.body.aname;
   var cname =req.body.cname;
   var data = {  
      "cname":cname,
      "aname":aname
   }
   db.collection('assignment').insertOne(data,function(err, collection){
   if (err) throw err;
  i=1
   });
   if(i==0)
 return  res.redirect('home.html');
 else
 return res.redirect('error1.html');
})
app.get('/assignment', function(req,res){

 
  db.collection('assignment').find().toArray(function(err, items){
   if (err) throw err;
   res.render('assignment', { title: 'User List', userData: items});
   });
  
})
app.delete('/assignment', function(req,res){
   var aname =req.body.aname;
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutorialsPoint");
  var myquery = { aname: aname };
  dbo.collection("assignment").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
    return res.send('1 document deleted');
  });
});
   
 })

 app.put('/assignment', function(req,res){
   var aname =req.body.aname; var name1 =req.body.name1;var cname =req.body.cname;
  
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutorialsPoint");
  var myquery = { cname: cname };
  var newvalues = { $set: {cname: name1,aname: aname} };
  dbo.collection("assignment").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
    
  });

  return res.send('1 document updated');
});
   
 })

 app.get('/salary/edit/:id', function(req,res){
  var tname1 = req.url.split("/")
  var tname =tname1[tname1.length-1]
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
     if (err) throw err;
      var dbo = db.db("tutorialsPoint"); 
      var myquery = { tname: tname };
      dbo.collection("salary").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
          console.log("1 document deleted");
          db.close();
       // return res.send('1 document deleted');
  
      });
    });
  })

 app.post('/salary', function(req,res){
   var i=0;
   var tname =req.body.tname;
   var salary =req.body.salary;
   var data = {  
      "tname":tname,
      "salary":salary
   }
   db.collection('salary').insertOne(data,function(err, collection){
   if (err) throw err;
  i=1
   });
   if(i==0)
 return  res.redirect('home.html');
 else
 return res.redirect('error1.html');
})
app.get('/salary', function(req,res){

 
  db.collection('salary').find().toArray(function(err, items){
   if (err) throw err;
   res.render('salary', { title: 'User List', userData: items});
   });
  
})

app.get('/salary1', function(req,res){

 
  db.collection('salary').find().toArray(function(err, items){
   if (err) throw err;
   res.render('salary1', { title: 'User List', userData: items});
   });
  
})

app.delete('/salary', function(req,res){
   var tname =req.body.tname;
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutorialsPoint");
  var myquery = { tname: tname };
  dbo.collection("salary").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
    return res.send('1 document deleted');
  });
});
   
 })

 app.put('/salary', function(req,res){
   var tname =req.body.tname; var name1 =req.body.name1; var salary =req.body.salary;
  
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutorialsPoint");
  var myquery = { tname: tname };
  var newvalues = { $set: {tname: name1,salary: salary} };
  dbo.collection("salary").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
    
  });

  return res.send('1 document updated');
});
   
 })

 app.get('/accountant/edit/:id', function(req,res){
  var accname1 = req.url.split("/")
  var accname =accname1[accname1.length-1]
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
     if (err) throw err;
      var dbo = db.db("tutorialsPoint"); 
      var myquery = { accname: accname };
      dbo.collection("accountant").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
          console.log("1 document deleted");
          db.close();
       // return res.send('1 document deleted');
  
      });
    });
  })

 app.post('/accountant', function(req,res){
   var i=0;
   var accname =req.body.accname;
   var sname =req.body.sname;
   var astatus =req.body.astatus;
   var data = {  
      "accname":accname,
      "sname": sname,
      "astatus":astatus
   }
   db.collection('accountant').insertOne(data,function(err, collection){
   if (err) throw err;
  i=1
   });
   if(i==0)
 return  res.redirect('home.html');
 else
 return res.redirect('error1.html');
})
app.get('/accountant', function(req,res){

 
  db.collection('accountant').find().toArray(function(err, items){
   if (err) throw err;
   res.render('accountant', { title: 'User List', userData: items});
   });
  
})
app.delete('/accountant', function(req,res){
   var accname =req.body.accname;
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutorialsPoint");
  var myquery = { accname: accname };
  dbo.collection("accountant").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
    return res.send('1 document deleted');
  });
});
   
 })

 app.put('/accountant', function(req,res){
   var accname =req.body.accname; var name1 =req.body.name1; var sname =req.body.sname; var astatus = req.body.astatus;
  
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tutorialsPoint");
  var myquery = { accname: accname };
  var newvalues = { $set: {accname: name1,sname: sname, astatus: astatus} };
  dbo.collection("accountant").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
    
  });

  return res.send('1 document updated');
});
   
 })

console.log("server listening at port 3000");