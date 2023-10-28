const router = require("express").Router();
const Medicine = require("../models/Meds");
const User = require("../models/User");
//adding a new medicine
router.post("/", async (req, res) => {
  const newMed = new Medicine(req.body);
  try {
    if(req.body.dose === req.body.times.length){
      const savedPost = await newMed.save();
      res.status(200).json(savedPost);
    }
    else{
      res.status(403).json("please enter the correct no. of dossage");
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});
//updating an existing medicine for eg its time etc..
router.put("/:id", async (req, res) => {
  try {
    const meds = await Medicine.findById(req.params.id);
    if (meds.userId === req.body.userId) {
      await meds.updateOne({ $set: req.body });
      res.status(200).json("the medicine has been updated");
    } else {
      res.status(403).json("you can update only your medicine");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//deleting a specific medicine
router.delete("/:id", async (req, res) => {
  try {
    const med = await Medicine.findById(req.params.id);
    if (med.userId === req.body.userId) {
      await med.deleteOne();
      res.status(200).json("the medicine has been deleted");
    } else {
      res.status(403).json("you can delete only your medicine");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//showing the info for a particular medicine
router.get("/:id", async (req, res) => {
    try {
      const meds = await Medicine.findById(req.params.id);
      res.status(200).json(meds);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//we can always integrate some apis that show the info/description of the medicine entered by the user which will provide him/her with the necessary information 
module.exports = router;