const { Thoughts, Users } = require('../models');

module.exports = {
  // Get all thoughtss
  getthoughtss(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thoughts
  getSinglethoughts(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtsId })
      .select('-__v')
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with that ID' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thoughts
  createthoughts(req, res) {
    Thoughts.create(req.body)
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thoughts
  deletethoughts(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtsId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with that ID' })
          : Student.deleteMany({ _id: { $in: thoughts.students } })
      )
      .then(() => res.json({ message: 'thoughts and students deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thoughts
  updatethoughts(req, res) {
    thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
};
