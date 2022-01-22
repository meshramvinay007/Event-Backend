const express = require("express");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const speakerSchema = new mongoose.Schema({
  name: String,
  desc: String,
  speakerImage: String,
});

const Speaker = mongoose.model("speaker", speakerSchema);

router.get("/", function (req, res, next) {
  Speaker.find({}, function (err, response) {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
});

router.post("/", upload.single("speakerImage"), function (req, res,next) {
  const name = req.body.name;
  const desc = req.body.desc;
  const speakerImage = req.file.path;

  const speaker = new Speaker({
    name: name,
    desc: desc,
    speakerImage,
  });
  speaker.save().then(res.send("Successfully send the data."));
});

router.put("/:id", upload.single("speakerImage"), function (req, res) {
  const name = req.body.name;
  const id = req.params.id;
  const desc = req.body.desc;
  const speakerImage = req.file.path;

  Speaker.findByIdAndUpdate(
    id,
    { $set: { name, desc, speakerImage } },
    function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully updated the speaker");
      }
    }
  );
});

router.delete("/:id", function (req, res) {
  id = req.params.id;
  Speaker.findByIdAndDelete(id, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully deleted the speaker");
    }
  });
});

module.exports = router;
