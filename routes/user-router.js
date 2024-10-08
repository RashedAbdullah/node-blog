const { Router } = require("express");
const { userModel } = require("../models/user-model");

const userRouter = Router();

userRouter.get("/signin", (req, res) => {
  return res.render("signin");
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await userModel.matchPasswordAndGenerateToken(
      email,
      password
    );
    return res.cookie("token", token).redirect("/");
  } catch (err) {
    return res.render("signin", {
      err: "Incorrect Email or Password",
    });
  }
});

userRouter.get("/signup", (req, res) => {
  return res.render("signup");
});

userRouter.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await userModel.create({ fullName, email, password });

  return res.redirect("/user/signin");
});

userRouter.get("/signout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});

module.exports = { userRouter };
