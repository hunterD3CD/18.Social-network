// ---------------------------------------------------------import schema & model & Types modular from mongoose-------------------------------------------
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// ------------------------------------------------------------storing the following data in the reaction schema-------------------------------------------------------------
// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
const reactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent thought _id
    reactionId: {
      //   Use Mongoose's ObjectId data type
      type: Schema.Types.ObjectId,
      //   Default value is set to a new ObjectId
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      //   Set default value to the current timestamp
      default: Date.now,
      //   the value in the createdAt field will be formatted by the dataFormat() function
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// ------------------------------------------------------------storing the following data in the thought schema-------------------------------------------------------------
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    // Array of nested documents created with the reactionSchema
    // associate reactions with thoughts
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total count of reactions on retrieval
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// ------------------------------------------------------------create the Thought model including reaction schema using the thought Schema-------------------------------------------------------------
const Thought = model("Thought", thoughtSchema);

// export the User model
module.exports = Thought;
