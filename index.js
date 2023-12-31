import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import mongoose from 'mongoose'; 
const port =3002;
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb+srv://naniabburi55:nani9989@cluster0.e8cbyj2.mongodb.net/?retryWrites=true&w=majority").then(()=>{
  console.log("connected")}
)
//user schems
const userSchema = new mongoose.Schema({
  username:String,
  email:String,
  password:String
})
///en

///function to upload data to db when regesters

const user = mongoose.model("userdaaata",userSchema)
const uploadtodb = async (req,res)=>{

await user.create({ 
username:req.body["username"],
email:req.body["email"],
password:req.body["password"] })
}
///en


//function to chreck and authenticate login data
const loginauth =async (res,username,password)=>{
  const result = await user.exists({username:username,password:password})
  if(result){
    res.redirect("/home")
  }
  else{
    res.redirect("/login")
  }
}
//




app.get("/home",(req,res)=>{
  res.render("homepage.ejs")
})
app.get("/",(req,res)=>{
  res.redirect("/login")
})
app.get("/regester",(req,res)=>{
    res.render("signuppage.ejs");
});
app.get("/login",(req,res)=>{
    res.render("loginpage.ejs");
})
app.post("/login/auth",(req,res)=>{
   const user = req.body["username"];
   const pass= req.body["password"];
   loginauth(res,user,pass)
  
});
app.post("/regester/reg",(req,res)=>{
      uploadtodb(req,res)
      res.redirect("/login");
});
app.listen(port,(req,res)=>{
    console.log("server is listening");
});