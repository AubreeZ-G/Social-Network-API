const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reactions");
// Schema to create a course model
const thoughtSchema = new Schema(
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

ThoughtsSchema.virtuals("reactionCount").get(function(){
  return this.reaction.length;

})
const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;
