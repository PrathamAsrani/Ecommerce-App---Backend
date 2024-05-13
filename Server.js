const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.status(200).send({
        message: "Hello from Pratham",
    });
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})