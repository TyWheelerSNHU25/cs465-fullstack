const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

// GET: /trips
const tripsList = async (req, res) => {
  const q = await Model.find({}).exec();
  if (!q) {
    return res.status(404).json({ message: 'No trips found' });
  } else {
    return res.status(200).json(q);
  }
};

// GET: /trips/:tripCode
const tripsFindByCode = async (req, res) => {
  const q = await Model.find({ code: req.params.tripCode }).exec();
  if (!q) {
    return res.status(404).json({ message: 'Trip not found' });
  } else {
    return res.status(200).json(q);
  }
};

// POST: /trips
const tripsAddTrip = async (req, res) => {
  const newTrip = new Trip({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: parseFloat(req.body.perPerson),
    image: req.body.image,
    description: req.body.description
  });

  const q = await newTrip.save();

  if (!q) {
    return res.status(400).json({ message: 'Failed to add trip' });
  } else {
    return res.status(201).json(q);
  }
};

// PUT: /trips/:tripCode
const tripsUpdateTrip = async (req, res) => {
  console.log(req.params);
  console.log(req.body);

  const q = await Model.findOneAndUpdate(
    { code: req.params.tripCode },
    {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: parseFloat(req.body.perPerson),
      image: req.body.image,
      description: req.body.description
    },
    { new: true }
  ).exec();

  if (!q) {
    return res.status(404).json({ message: 'Trip not found to update' });
  } else {
    return res.status(201).json(q);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};
