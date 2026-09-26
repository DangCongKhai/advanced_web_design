require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const squareRouter = require('./routes/square');

const app = express();
const port = 3000

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


const MONGODB_URI = process.env.MONGODB_URI
// Connect to mongodb
mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((err) => {
    console.error('Error connecting to MongoDB', err)
})


app.use('/', squareRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})