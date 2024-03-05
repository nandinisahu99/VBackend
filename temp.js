const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();


app.use(cors()); // Use the cors middleware to allow all origins

app.use(express.json());

app.post('/register', async (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

app.listen(5000, () => {
    console.log("connected");
});
