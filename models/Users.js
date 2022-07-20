const { Schema, model } = require('mongoose');

// Schema to create Users model
const UsersSchema = new Schema(
  {
    Username: {
      type: String,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
      match:[/.+@.+\..+/, 'Must match an email address!']

    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: "Thought"
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: "Users"
    }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id:false
  }
);

UsersSchema.virtual("friendCount").get(function(){
  return this.friends.length;

})


const Users = model('Users', UsersSchema);

module.exports = Users;
