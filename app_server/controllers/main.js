/* Get Homepage */
const index = (req, res) => {
  res.renderer('index', { title: "Travlr Getaways"});
  };

  module.exports = {
    index
  }