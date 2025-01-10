const { Router } = require("express");
const { format } = require("date-fns");
const formRouter = Router();
const indexController = require("../controllers/indexController");

formRouter.get("/", (req, res) =>
  res.render("form", { title: "Add message", errors: [] }),
);
formRouter.post("/", indexController.messagesPost);
module.exports = formRouter;
