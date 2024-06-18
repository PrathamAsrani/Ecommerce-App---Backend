const express = require('express');
const connectDB = require('./db_config/db.js');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const authRoute = require('./routes/authRoute.js');
const categoryRoute = require('./routes/categoryRoute.js');
const productRoute = require('./routes/productRoute.js');

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

const PORT = process.env.PORT || 5000;

// rest api
app.get('/', (req, res) => {
    res.status(200).send({
        message: "Hello from Pratham",
    });
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})