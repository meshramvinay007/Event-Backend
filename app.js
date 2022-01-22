const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();


const Modertors = require("./moderators");
const Speakers = require("./speakers");
const Organisers = require("./organisers");
const Resouces = require("./resources");
const Tags = require("./tags");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/moderators", Modertors);
app.use("/speakers", Speakers);
app.use("/organisers", Organisers);
app.use("/tags", Tags);
app.use("/resources", Resouces);

const DB =
  "mongodb://localhost:27017";

mongoose
  .connect(DB)
  .then(console.log("Connection Successful"))
  .catch((err) => console.log(err));

const eventSchema = new mongoose.Schema({
  title: String,
  url: String,
  date: String,
  startTime: String,
  endTime: String,
});

const Event = mongoose.model("event", eventSchema);

app.get("/", function (req, res) {
  Event.find({}, function (err, response) {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
});

app.post("/", function (req, res) {
  const title = req.body.title;
  const url = req.body.url;
  const date = req.body.date;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;

  const event = new Event({
    title,
    url,
    date,
    startTime,
    endTime,
  });
  event.save().then(res.send("Successfully send the data."));
});

app.listen(3000, function () {
  console.log("Server has started at port 3000.");
});
