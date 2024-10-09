const { Router } = require("express");
const { blogModel } = require("../models/blog-model");
const multer = require("multer");
const path = require("path");
const { userModel } = require("../models/user-model");
const { commentModel } = require("../models/comment-model");

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

  const comments = await commentModel.find({
    blogId: singleBlog._id.toString(),
  });

  return res.render("single-blog", {
    blog: singleBlog,
    user: req.user,
    comments,
  });
});

blogRouter.get("/add/new-blog", (req, res) => {
  return res.render("add-blog", {
    user: req.user,
  });
});

blogRouter.post("/add/comment", async (req, res) => {
  await commentModel.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });

  return res.redirect(`/${req.params.slug}`);
});

module.exports = { blogRouter };
