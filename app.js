const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose=require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];
mongoose.connect("mongodb://0.0.0.0:27017/todolistdb");
const schema=mongoose.Schema({
  task:String,
})
const work=new mongoose.model("work",schema);

app.get("/", function(req, res) {

const day = date.getDate();
  work.find({},function(err,found){
    res.render("list", {listTitle: day, newListItems: found});
  })
  

});

app.post("/", function(req, res){

  const item = req.body.newItem;
  
      const late=new work({
        task:item
      });
      late.save();
    
    
    //defa.push(item);
    
    res.redirect("/");
  
});
app.post("/delete", function(req, res){

  const ditem = req.body.checkbox;
  
      work.findByIdAndDelete(ditem,function (err,fo) {
        if(err){console.log(err);}
      })
    
    res.redirect("/");
  
});
app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
