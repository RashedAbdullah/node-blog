const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const { createTokenForUser } = require("../services/authentacition");
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
  const hashedPassowrd = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassowrd;

  next();
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");

  const salt = user.salt;
  const hashedPassowrd = user.password;

  const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedPassowrd !== userProvidedHash)
    throw new Error("Incorrect password");

  const token = createTokenForUser(user);
  return token;
});

const userModel = model("User", userSchema);

module.exports = { userModel };
