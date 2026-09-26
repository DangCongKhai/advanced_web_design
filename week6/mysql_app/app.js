require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
const squareRouter = require('./routes/square');

const app = express();
const port = 3000

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


app.use('/square', squareRouter);

app.use('/', (req, res) => {
    res.render('index', { perimeter: null, area: null })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})