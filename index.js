const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

const checkMiddleware = (req, res, next) => {
  const { idade } = req.query;

  if (!idade || Number.isNaN(parseInt(idade))) {
    return res.redirect("/");
  }

  return next();
};

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "njk");

app.get("/", (req, res) => {
  return res.render("form");
});

app.post("/check", (req, res) => {
  const { idade } = req.body;

  return idade >= 18
    ? res.redirect(`/maior/?idade=${idade}`)
    : res.redirect(`/menor/?idade=${idade}`);
});

app.get("/maior", checkMiddleware, (req, res) => {
  const { idade } = req.query;
  return res.render("maior", { idade });
});

app.get("/menor", checkMiddleware, (req, res) => {
  const { idade } = req.query;
  return res.render("menor", { idade });
});

app.listen(3000);
