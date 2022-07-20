const { ObjectId } = require('mongoose').Types;
const { Users, Course } = require('../models');

// Aggregate function to get the number of Userss overall
const headCount = async () =>
  Users.aggregate()
    .count('UsersCount')
    .then((numberOfUserss) => numberOfUserss);

// Aggregate function for getting the overall grade using $avg
const grade = async (UsersId) =>
  Users.aggregate([
    // only include the given Users by using $match
    { $match: { _id: ObjectId(usersId) } },
    {
      $unwind: '$assignments',
    },
    {
      $group: {
        _id: ObjectId(usersId),
        overallGrade: { $avg: '$assignments.score' },
      },
    },
  ]);

module.exports = {
  // Get all Users
  getUsers(req, res) {
    Users.find()
      .then(async (users) => {
        const usersObj = {
          users,
          headCount: await headCount(),
        };
        return res.json(usersObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single User
  getSingleUsers(req, res) {
    Users.findOne({ _id: req.params.UsersId })
      .select('-__v')
      .then(async (users) =>
        !users
          ? res.status(404).json({ message: 'No Users with that ID' })
          : res.json({
              users,
              grade: await grade(req.params.UsersId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new User
  createUsers(req, res) {
    console.log("USer",req.bod);
    Users.create(req.body)
      .then((Users) => res.json(Users))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a Users and remove them from the course
  deleteUsers(req, res) {
    Users.findOneAndRemove({ _id: req.params.UsersId })
      .then((Users) =>
        !users
          ? res.status(404).json({ message: 'No such Users exists' })
          : Course.findOneAndUpdate(
              { Userss: req.params.UsersId },
              { $pull: { Userss: req.params.UsersId } },
              { new: true }
            )
      )
      .then((course) =>
        !course
          ? res.status(404).json({
              message: 'Users deleted, but no courses found',
            })
          : res.json({ message: 'Users successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an reaction to a Users
  addFriends(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Users.findOneAndUpdate(
      { _id: req.params.UsersId },
      { $addToSet: { friends: req.params.friendsId } },
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
  removeFriends(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.UsersId },
      { $pull: { friends: { friendsId: req.params.friendsId } } },
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
