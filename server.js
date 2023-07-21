const express = require("express");

const appRoute = require('./routes/route');

const app = express();


app.use(express.json())

app.use("/api",appRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`server on port ${PORT}`);
})