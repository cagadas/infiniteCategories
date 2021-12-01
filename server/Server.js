const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/category.routes.js")(app);

var port = 5050
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});