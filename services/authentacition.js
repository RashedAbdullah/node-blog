const JWT = require("jsonwebtoken");

const secret = "nodeblogsecret@123";

const createTokenForUser = (user) => {
  const payload = {
    _id: user._id,
    name: user.fullName,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
  };

  const token = JWT.sign(payload, secret);
  return token;
};

const validateToken = (token) => {
  const payload = JWT.verify(token, secret);
  return payload;
};

module.exports = {
  createTokenForUser,
  validateToken,
};
