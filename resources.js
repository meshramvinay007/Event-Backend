const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
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

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const resourceSchema = new mongoose.Schema({
  title: String,
  quote: String,
  list: Array,
  youtubeURL: String,
  file: String,
});

const Resource = mongoose.model("resource", resourceSchema);

router.post("/", upload.single("resourceFile"), function (req, res,next) {
  title = req.body.title;
  quote = req.body.quote;
  list = req.body.list;
  youtubeURL = req.body.youtubeURL;
  file = req.file.path;

  const resource = new Resource({
    title,
    quote,
    list,
    youtubeURL,
    file,
  });

  resource.save().then(res.send("Successfully added the resources."));
});

router.get("/", function (req, res,next) {
  Resource.find({}, function (err, response) {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
});


router.delete('/:id',function(req,res,next){
    id = req.params.id;

    Resource.findByIdAndDelete(id,function(err){
        if(err){
            res.send(err)
        } else {
            res.send("successfully deleted the resource")
        }
    })
})

module.exports = router;
