const { Router } = require("express");
const { userModel } = require("../models/user-model");

const userRouter = Router();

userRouter.get("/signin", (req, res) => {
  return res.render("signin");
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.matchPassword(email, password);

  return res.redirect("/");
});

userRouter.get("/signup", (req, res) => {
  return res.render("signup");
});

userRouter.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await userModel.create({ fullName, email, password });

  return res.redirect("/user/signin");
});

module.exports = { userRouter };
