const express = require('express')

const app = express();
const port = 3000

app.set('view engine', 'ejs');
const userRouter = require('./routes/user');
const productRouter = require('./routes/products');

app.use('/user', userRouter);
app.use('/', productRouter);

app.get("/hello", (req, res) => {
    res.send("<h1 style='color:blue;font-size: 30px;'>Hello World</h1>")
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})