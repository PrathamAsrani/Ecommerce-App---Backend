const express = require('express');
const app = express();
const mongoose = require('./db_config/db.js');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
dotenv.config();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan('dev'));
const authRoute = require('./routes/authRoute.js');
app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.status(200).send({
        message: "Hello from Pratham",
    });
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})