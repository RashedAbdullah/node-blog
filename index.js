const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  return res.render("index");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
