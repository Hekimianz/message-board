const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index");
});

indexRouter.post("/", (req, res) => {
  res.redirect("/new");
});

module.exports = indexRouter;
