const express = require("express");
const app = express();
const router = express.Router();
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

const moderatorSchema = new mongoose.Schema({
  name: String,
  desc: String,
  moderatorImage: String,
});

const Moderator = mongoose.model("moderator", moderatorSchema);

router.get("/", function (req, res, next) {
  Moderator.find({}, function (err, response) {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
});

router.post("/", upload.single("moderatorImage"), function (req, res, next) {
  const name = req.body.name;
  const desc = req.body.desc;
  const moderatorImage = req.file.path;

  const moderator = new Moderator({
    name: name,
    desc: desc,
    moderatorImage,
  });
  moderator.save().then(res.send("Successfully send the data."));
});

router.put("/:id", upload.single("moderatorImage"), function (req, res, next) {
  const name = req.body.name;
  const id = req.params.id;
  const desc = req.body.desc;
  const moderatorImage = req.file.path;

  Moderator.findByIdAndUpdate(
    id,
    { $set: { name, desc, moderatorImage } },
    function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully updated the moderator");
      }
    }
  );
});

router.delete("/:id", function (req, res, next) {
  id = req.params.id;
  Moderator.findByIdAndDelete(id, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully deleted the moderator");
    }
  });
});

module.exports = router;
