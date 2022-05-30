
const express = require("express");
const mongoose = require("mongoose")
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
require("dotenv").config();

const app = express();

const port = process.env.PORT ;

mongoose.connect(

`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qldix.mongodb.net/?retryWrites=true&w=majority`
);
console.log(mongoose.connection.readyState)
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});