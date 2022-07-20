const { Thoughts, Users } = require('../models');

module.exports = {
  // Get all thoughtss
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thoughts
  getSingleThoughts(req, res) {
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
  createThoughts(req, res) {
    Thoughts.create(req.body)
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thoughts
  deleteThoughts(req, res) {
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
  updateThoughts(req, res) {
    Thoughts.findOneAndUpdate(
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
addReactions(req, res) {
  console.log('You are adding a reaction');
  console.log(req.body);
  Users.findOneAndUpdate(
    { _id: req.params.UsersId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((Users) =>
      !Users
        ? res
            .status(404)
            .json({ message: 'No Users found with that ID :(' })
        : res.json(Users)
    )
    .catch((err) => res.status(500).json(err));
},
// Remove assignment from a Users
removeReactions(req, res) {
  Users.findOneAndUpdate(
    { _id: req.params.UsersId },
    { $pull: { reactions: { reactionsId: req.params.reactionsId } } },
    { runValidators: true, new: true }
  )
    .then((Users) =>
      !Users
        ? res
            .status(404)
            .json({ message: 'No Users found with that ID :(' })
        : res.json(Users)
    )
    .catch((err) => res.status(500).json(err));
  },
};
