const express = require("express");
const hbs = require("hbs");
const path = require("path");
const fs = require("fs");

const app = express();

hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  const now = new Date().toISOString();
  const log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server.log");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

app.get("/", (req, res) => {
  //   res.send("<h1>EXPRESS</h1>");
  res.render("home.hbs", {
    pageTitle: "Home page",
    welcomeMessage: "ELOOO"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "AAAAAabout page"
  });
});

app.get("/bad", (req, res) => {
  res.send({ message: "error" });
});

app.listen(3000, () => {
  console.log("SERVER is ready");
});
