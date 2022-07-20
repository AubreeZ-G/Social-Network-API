const { Schema, model } = require('mongoose');
const reactionsSchema = require("./Reactions");
// Schema to create a course model
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,


      createdAt: {
        type: Date,
        default: Date.now(),
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [
        reactionsSchema
      ],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function(){
  return this.reaction.length;

})
const Thoughts = model('thoughts', ThoughtSchema);

module.exports = Thoughts;
