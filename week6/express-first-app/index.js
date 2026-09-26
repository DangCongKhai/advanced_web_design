const express = require('express')
const path = require('path')

const app = express();
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
const userRouter = require('./routes/user');
const productRouter = require('./routes/products');

app.use('/user', userRouter);
app.use('/products', productRouter);

app.get("/hello", (req, res) => {
    res.send("<h1 style='color:blue;font-size: 30px;'>Hello World</h1>")
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})