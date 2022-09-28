const exp = require("constants");
const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("./dist/FronEnd"));

app.get("/*", (req, res) => {
  res.sendFile("index.html", { root: "dist/FrontEnd/" });
});

app.listen(process.env.PORT || 3000);
