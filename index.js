const express = require("express");
const path = require("path");
const { userRouter } = require("./routes/user-router");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/middle-auth");
const { blogRouter } = require("./routes/blog-router");
const { blogModel } = require("./models/blog-model");

const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/node-blog")
  .then(() => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const blogs = await blogModel.find({});
  return res.render("index", { blogs, user: req.user });
});

app.use("/user", userRouter);
app.use("/blogs", blogRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
