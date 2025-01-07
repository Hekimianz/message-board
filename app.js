require("dotenv").config();
const express = require("express");
const { format } = require("date-fns");
const path = require("node:path");
const app = express();
const PORT = process.env.PORT || 3000;
const assetsPath = path.join(__dirname, "public");
const indexRouter = require("./routes/indexRouter");

const messages = [
  {
    text: "Hi!!!",
    user: "Flat-pancake342",
    added: format(new Date(), "EEE d, MMM yyyy HH:mm"),
  },
  {
    text: "Im hungry, anyone want to go out?",
    user: "RunningWater12",
    added: format(new Date(), "EEE d, MMM yyyy HH:mm"),
  },
  {
    text: "Happy new year!!!",
    user: "Grumoz",
    added: format(new Date(), "EEE d, MMM yyyy HH:mm"),
  },
  {
    text: "Today its my two month anniversary with my special other, i was going to watch movies with her alll day long <3",
    user: "Dire-speed",
    added: format(new Date(), "EEE d, MMM yyyy HH:mm"),
  },
  {
    text: "Hi!!!",
    user: "Flat-pancake342",
    added: format(new Date(), "EEE d, MMM yyyy HH:mm"),
  },
  {
    text: "Im hungry, anyone want to go out?",
    user: "RunningWater12",
    added: format(new Date(), "EEE d, MMM yyyy HH:mm"),
  },
  {
    text: "Happy new year!!!",
    user: "Grumoz",
    added: format(new Date(), "EEE d, MMM yyyy HH:mm"),
  },
  {
    text: "Today its my two month anniversary with my special other, i was going to watch movies with her alll day long <3",
    user: "Dire-speed",
    added: format(new Date(), "EEE d, MMM yyyy HH:mm"),
  },
];

app.use((req, res, next) => {
  res.locals.messages = messages;
  next();
});

app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log("Server listening on port: " + PORT);
});
