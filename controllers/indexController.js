const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const { format } = require("date-fns");
const Filter = require("bad-words");
const filter = new Filter();

const validateFields = [
  body("user")
    .trim()
    .notEmpty()
    .withMessage("User is required.")
    .custom((value) => {
      if (filter.isProfane(value)) {
        throw new Error("User contains inappropriate language.");
      }
      return true;
    })
    .escape(),
  body("message")
    .notEmpty()
    .withMessage("Message is required")
    .custom((value) => {
      if (filter.isProfane(value)) {
        throw new Error("Message contains inappropriate language.");
      }
      return true;
    })
    .escape(),
];

exports.messagesGet = async (req, res) => {
  const messages = await db.getMessages();
  messages.forEach((msg) => {
    msg.date = format(new Date(msg.date), "EEE, MMM dd, yyy, hh:mm a");
  });
  res.render("index", { title: "MiniBoard", messages: messages });
};

exports.messagesPost = [
  validateFields,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("form", {
        title: "Add message",
        errors: errors.array(),
      });
    }
    const { user, message } = req.body;
    const date = new Date().toISOString();
    try {
      await db.addMessage(user, message, date);
      res.redirect("/");
    } catch (err) {
      console.error("Error inserting message:", err);
      res.status(500).send("internal Server Error");
    }
  },
];
