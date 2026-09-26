const Square = require('../models/square');

exports.showForm = (req, res) => {
  res.render('index', { perimeter: null, area: null });
};

exports.calculateSquare = async (req, res) => {
  const side = Number(req.body.side);
  const perimeter = 4 * side;
  const area = side * side;
  const square = new Square({ side, perimeter, area });
  await square.save();
  res.render('index', { perimeter, area });
};

