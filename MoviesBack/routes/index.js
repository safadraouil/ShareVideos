var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "home" });
  res.end();
});

router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "contact", phrase: " Home page" });
});

router.get("/services", function (req, res, next) {
  res.render("services", { title: "services" });
});

module.exports = router;
