const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const tagSchema = new mongoose.Schema({
  name: String,
});

const Tag = mongoose.model("tag", tagSchema);

router.get("/", function (req, res,next) {
  Tag.find({}, function (err, response) {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
});

router.post("/", function (req, res) {
  const name = req.body.name;

  const oganiser = new Tag({
    name,
  });

  tag.save().then(res.send("Successfully added tag"));
});


router('/:id',function(req,res,next){
    const id = req.params.id;

    Tag.findByIdAndDelete(id,function(err,response){
        if(err){
            res.send(err);
        } else {
            res.send("Successfully deleted tag");
        }
    })
})

module.exports = router;
