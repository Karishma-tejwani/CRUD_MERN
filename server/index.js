const express = require('express');
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect()

app.listen(3001, () => {
    console.log("Server is listening at port 3001");
})