const { Router } = require("express");
const { format } = require("date-fns");
const formRouter = Router();

formRouter.get("/", (req, res) => res.render("form"));
formRouter.post("/", (req, res) => {
  const { user, message } = req.body;
  const newMessage = {
    text: message,
    user: user,
    added: format(new Date(), "EEE d, MMM yyyy HH:mm"),
  };
  res.locals.messages.push(newMessage);
  res.redirect("/");
});

module.exports = formRouter;
