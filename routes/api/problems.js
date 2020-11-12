const express = require('express');
const router = express.Router();

//Problem Model
const Problem = require("../../models/Problem");

//@route GET api/problems
//@desc get all problems
//@access Public
router.get("/", async (req, res) => {
    try {
      const problems = await Problem.find();
      if (!problems) throw Error("No problems");
      res.status(200).json(problems);
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  });
  
  //@route POST api/problems
  //@desc create a problem
  //@access Private
  router.post("/", async (req, res) => {
    const newProblem = new Problem({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        difficulty: req.body.difficulty
    });
    try {
      const problem = await newProblem.save();
      if (!problem) throw Error("Something went wrong saving the problem");
      res.status(200).json(problem);
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  });

  //@route DELETE api/problems
  //@desc delete a problem
  //@access Private
  router.delete("/:id", async (req, res) => {
    try {
      const problem = await Problem.findById(req.params.id);
      if (!problem) throw Error("No problem found");
      const removed = await problem.remove();
      if (!removed) throw Error("Something went wrong deleting the problem");
      res.status(200).json({success: true});
    } catch (err) {
      res.status(400).json({ msg: err.message, success: false });
    }
  });

  module.exports = router