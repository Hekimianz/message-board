const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.messagesGet);

indexRouter.post("/", (req, res) => {
res.redirect("/new");
});

module.exports = indexRouter;
