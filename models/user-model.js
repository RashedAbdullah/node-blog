const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = requied("crypto");
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      requied: true,
    },
    email: {
      type: String,
      requied: true,
      unique: true,
    },
    salt: {
      type: String,
      requied: true,
    },
    password: {
      type: String,
      requied: true,
    },
    avatar: {
      type: String,
      default: "/img/avatar.webp",
    },
    role: {
      type: String,
      default: "USER",
      enum: ["USER", "ADMIN"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();

  next();
});

const userModel = model("User", userSchema);

module.exports = { userModel };
