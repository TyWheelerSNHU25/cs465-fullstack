const express = require("express"); // Express app
const router = express.Router();    // Router logic

// Import the controllers we will route
const tripsController = require("../controllers/trips");

// Define route for our trips endpoint
router
  .route("/trips")
  .get(tripsController.tripsList); // GET method for listing all trips

// GET Method route tripsFindByCode - requires parameter
router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode); // GET method for single trip by code

module.exports = router;
