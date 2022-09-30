const express = require('express');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

const app = express();

app.use(cookieParser());     // for middleware to show about page after login

// fetching secured database link
dotenv.config({ path: "./config.env" });
require('./db/conn');

// fetching User-userSchema
// const User = require('./model/userSchema');

app.use(express.json());

//we link the routes files to make our route easy
app.use(require('./routes/auth.js'));

//middlewares
// const middleware = (req, res, next) => {
//     console.log(`Hello From Middleware`);
//     next();
// }

// app.get("/about", middleware, (req, res) => {
//     console.log(`Hello my about`);
//     res.send(`Hello from about server side`);
// })

//heroku hosting
if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    // const path = require('path');
    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    // })
}



const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})