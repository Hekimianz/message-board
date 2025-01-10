require("dotenv").config();
const express = require("express");
const { format } = require("date-fns");
const path = require("node:path");
const app = express();
const PORT = process.env.PORT || 3000;
const assetsPath = path.join(__dirname, "public");
const indexRouter = require("./routes/indexRouter");
const formRouter = require("./routes/formRouter");

app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   res.locals.messages = messages;
//   next();
// });

app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/new", formRouter);

app.listen(PORT, () => {
  console.log("Server listening on port: " + PORT);
});
