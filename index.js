const express = require("express");
const { default: mongoose, mongo } = require("mongoose");
const path = require("path");
const cookieParser = require('cookie-parser');


const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/newDataBase").then(()=>{
  console.log("DB connected");
}).catch((err)=>{
  console.log(err);
})
let userSchema = new mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  email:{
    type:String,
    required: true,
    unique: true
  },
  password:{
    type:String,
    required: true
  }
});
let userDetails = mongoose.model("userDetails",userSchema);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.set('view engine','ejs');

const isAuthenticated = async(req,res,next)=>{
  next()
}

app.get("/", async(req,res)=>{
  // console.log(req.cookies)
  if(req.cookies.userEmail && req.cookies.userPassword){
    const docs1 = await userDetails.find({ email: req.cookies.userEmail});
    let entry = false;
    if(docs1[0].password === req.cookies.userPassword){
          entry = true
    }
    if(docs1.length === 1 && entry){
       res.send("you are logged in")
    }else{
      res.render("login")
    }
  }else{
    res.render("index")
  }
})

app.get("/login",isAuthenticated,(req,res)=>{
    res.render('login')
})
app.get("/signup",(req,res)=>{
    res.render('signup')
})

app.post("/submit",async(req,res)=>{
  data = req.body;
  console.log(data);
  try {
    const email = data.email;
    const docs = await userDetails.find({ email: email});
    // console.log('docs',docs);
    // console.log(docs.length)
    if(docs.length === 0){
      userDetails.create({
        name: data.name,
        email: data.email,
        password: data.password
      }).then(()=>{
        console.log("New user created");
      }).catch((err)=>{
        console.log(err);
      })
      res.cookie("userEmail",data.email,{maxAge: 120*1000})
      res.cookie("userPassword",data.password,{maxAge: 120*1000})
      res.send("You are logged in")
    }else{
      console.log("Email already registered")
      res.render("resignup")
  }
  } catch (err) {
    console.error('Error finding documents:', err);
  }
})

app.post("/loginSubmit", async(req,res)=>{
  data = req.body;
  console.log(data);
  try {
    const email = data.email;
    const password = data.password;
    const docs1 = await userDetails.find({ email: email});
    let entry = false;
    console.log(docs1)
    if(docs1[0].password === password){
       entry = true;
    }  
    if(docs1.length === 1 && entry){
      res.cookie("userEmail",data.email,{maxAge: 120*1000})
      res.cookie("userPassword",data.password,{maxAge: 120*1000})
      res.send("You are logged in")
    }else{res.render("relogin")}
  } catch (err) {
    console.error('Error finding documents:', err);
  }
})

app.listen(4500,()=>{
    console.log("The server is running on http://localhost:4500");
})

