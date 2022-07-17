const express = require('express');
const mongoose = require("mongoose");
const app = express();

const foodModel = require("./models/Food");

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/food");

app.post("/inser", async(req, res) => {
    const food = new foodModel({foodName: "Apple", daySinceIAte: 3});
    try{
        await food.save();
        res.send("data inserted");
    }
    catch(err){
        console.log(err);
    }
});

app.listen(3001, () => {
    console.log("Server is listening at port 3001");
});