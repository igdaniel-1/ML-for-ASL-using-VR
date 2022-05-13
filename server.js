const express = require("express");
const mongoose = require("mongoose");
const {HandSignClassifier} = require("./db.js");
const app = express();
// app.set("view engine", "hbs");
// these are called on the way to the server
app.use(express.static("./"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/data", (req,res) => {
    HandSignClassifier.findOne({_id: "627e0821e60a51d7ddef08f7"},(err, results, count)=>{
        console.log(results);
        res.status(200).json(results);
    });
});

app.post("/data", (req, res) => {
    const data = req.body;
    console.log(data);
    if(data.letter === "m"){
        HandSignClassifier.findOneAndUpdate({_id: "627e0821e60a51d7ddef08f7"},
        {$push: {m_data: data.value}}, 
        (error,success) => {
            if(error){
                console.log(error);
            }
            else{
                console.log(success);
            }
        }
    );
    }
    else{
        HandSignClassifier.findOneAndUpdate({_id: "627e0821e60a51d7ddef08f7"},
        {$push: {n_data: data.value}},
        (error,success) => {
            if(error){
                console.log(error);
            }
            else{
                console.log(success);
            }
        }
    );
    }
    
});


app.listen(8080);
console.log("server running");