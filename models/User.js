// ---------------------------------------------------------import schema & model modular from mongoose-------------------------------------------
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// ------------------------------------------------------------storing the following data in the user model-------------------------------------------------------------
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Must enter a valid email address",
      ],
    },
    thoughts: [
      {
        // it tell Mongoose to expect an ObjectId and to tell it that its data comes from the Thought model
        type: Schema.Types.ObjectId,
        // it tell the User model which documents to search to find the right thought
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        // Array of _id values referencing the User model (self-reference)
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

// get total count of friends on retrieval
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// ------------------------------------------------------------create the User model using the userSchema-------------------------------------------------------------
const User = model("User", userSchema);

// export the User model
module.exports = User;
