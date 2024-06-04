const express = require('express');
const app = express();
const mongoose = require('./db_config/db.js');
const dotenv = require('dotenv');
const morgan = require('morgan');
var cors = require('cors');
dotenv.config();

const authRoute = require('./routes/authRoute.js');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use("/api/v1/auth", authRoute);

app.get('/', (req, res) => {
    res.status(200).send({
        message: "Hello from Pratham",
    });
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})