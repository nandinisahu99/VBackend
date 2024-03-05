
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();
const User = require('./models/User');

app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.json()); // For parsing application/json

app.use('/api', require('./Routes/Register'));

const savescore = require("./Routes/Savescore.js");
app.post("/api/score", savescore);

const port = process.env.PORT || 5000;
// console.log(port);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => app.listen(port, console.log(`connected, listening on ${port}`)))
    .catch((err) => console.log(`${err} unable to connect`));


