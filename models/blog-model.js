const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      requied: true,
    },
    slug: {
      type: String,
      requied: true,
    },
    body: {
      type: String,
      requied: true,
    },
    cover: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const blogModel = model("Blog", blogSchema);

module.exports = { blogModel };
