const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const tutorialController = require('./app/controllers/tutorial.controller')

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));



// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.post('/api/tutorials', tutorialController.create);

const db = require("./app/models");
if (process.env.NODE_ENV !== 'test') {
  db.sequelize.sync({force: true})
    .then(() => {
      console.log("Synced db.");
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

if (process.env.NODE_ENV !== 'test') {
  // Only set port and listen when not in test environment
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}
module.exports = app;