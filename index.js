const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Understanding JavaScript Closures",
      slug: "understanding-javascript-closures",
      excerpt:
        "JavaScript closures are a fundamental concept that every JavaScript developer should understand...",
      image:
        "https://bloggingfordevs.com/images/trends-images/javascript-blogs.png",
    },
    {
      title: "10 Tips for a Healthier Lifestyle",
      slug: "10-tips-healthier-lifestyle",
      excerpt:
        "Living a healthier lifestyle doesn’t have to be complicated. Here are 10 easy tips to get you started...",
      image:
        "https://oncquest-blog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2023/07/12043920/a.jpg",
    },
    {
      title: "The Future of Tech: AI and Machine Learning",
      slug: "future-tech-ai-machine-learning",
      excerpt:
        "Artificial Intelligence and Machine Learning are transforming the way we live and work...",
      image:
        "https://builtin.com/sites/www.builtin.com/files/2022-07/future-artificial-intelligence.png",
    },
  ];
  return res.render("index", { blogs });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
