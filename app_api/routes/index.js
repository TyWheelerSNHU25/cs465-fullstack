const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");
const jwt = require("jsonwebtoken");

// JWT authentication middleware
function authenticateJWT(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    console.log("Auth Header Required but NOT PRESENT!");
    return res.sendStatus(401);
  }

  const headers = authHeader.split(" ");
  if (headers.length < 2) {
    console.log("Not enough tokens in Auth Header: " + headers.length);
    return res.sendStatus(501);
  }

  const token = headers[1]; // Bearer <token>
  if (!token) {
    console.log("Null Bearer Token");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      return res.status(401).json("Token Validation Error!");
    }
    req.auth = verified; // Store decoded token
    next(); // Proceed to next middleware/controller
  });
}

// Registration and login routes
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

// Trip routes
router
  .route("/trips")
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);

router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip);

module.exports = router;
