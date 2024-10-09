const { Router } = require("express");
const { blogModel } = require("../models/blog-model");
const multer = require("multer");
const path = require("path");
const { userModel } = require("../models/user-model");

const blogRouter = Router();

// Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const name = `${Date.now()}-${file.originalname}`;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

blogRouter.post("/", upload.single("cover"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await blogModel.create({
    title,
    body,
    slug: title.replaceAll(" ", "-"),
    cover: `/uploads/${req.file.filename}`,
    createdBy: req.user._id,
  });
  return res.redirect(`/blogs/${blog.slug}`);
});

blogRouter.get("/:slug", async (req, res) => {
  const singleBlog = await blogModel
    .findOne({ slug: req.params.slug })
    .populate({
      path: "createdBy",
      model: userModel,
    });

  return res.render("single-blog", { blog: singleBlog });
});

blogRouter.get("/add/new-blog", (req, res) => {
  return res.render("add-blog", {
    user: req.user,
  });
});

module.exports = { blogRouter };
