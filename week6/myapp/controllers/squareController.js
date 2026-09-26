const Square = require('../models/square');

exports.getUsers = async (req, res) => {
 
  try {
    // 1. Fetch data from MongoDB using Mongoose methods
    const squareList = await Square.find(); 
    
    // 2. Return the data to the client
    res.render('index', { squareList });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

  

exports.calculateSquare = async (req, res) => {
  const side = Number(req.body.side);
  const perimeter = 4 * side;
  const area = side * side;
  const square = new Square({ side, perimeter, area });
  await square.save();
  res.redirect('/square');
};

