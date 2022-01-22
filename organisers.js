const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const organiserSchema = new mongoose.Schema({
  name: String,
});

const Organiser = mongoose.model("organiser", organiserSchema);

router.get("/", function (req, res, next) {
  Organiser.find({}, function (err, response) {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
  });
});

router.post("/", function (req, res, next) {
  const name = req.body.name;

  const oganiser = new Organiser({
    name,
  });

  Organiser.save().then(res.send("Successfully added organiser"));
});

router.get('/:id',function(req,res){
    const id = req.params.id;

    Organiser.findByIdAndDelete(id,function(err,response){
        if(err){
            res.send(err);
        } else {
            res.send("Successfully deleted Organiser");
        }
    })
})

module.exports = router;
