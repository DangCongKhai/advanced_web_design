const Square = require('../models/square');

exports.getSquares = async (req, res) => {
 
  try {
    // 1. Fetch data from MongoDB using Mongoose methods
    const squareList = await Square.findAll(); 
    
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
  await Square.saveToDatabase(side, perimeter, area);
  res.redirect('/square');
};

