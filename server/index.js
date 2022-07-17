const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

const foodModel = require("./models/Food");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/food");

app.post("/insert", async(req, res) => {
    const foodName = req.body.foodName;
    const days = req.body.days;
    const food = new foodModel({foodName: foodName, daySinceIAte: days});
    try{
        await food.save();
        res.send("data inserted");
    }
    catch(err){
        console.log(err);
    }
});

app.get("/view", async(req, res) => {
    foodModel.find({}, (err, result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    })
});

app.put("/update", async(req, res) => {
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;

    try{
       await foodModel.findById(id, (err, updatedFood) => {
        updatedFood.foodName = newFoodName;
        updatedFood.save();
        res.send("updated")
       })
    }
    catch(err){
        console.log(err);
    }
});

app.delete("/delete/:id", async(req, res) => {
    const id = req.params.id;
    await foodModel.findByIdAndRemove(id).exec();
    res.send("deleted"); 
})

app.listen(3001, () => {
    console.log("Server is listening at port 3001");
});