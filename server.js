const express = require("express");
const appRoute = require('./routes/route');
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json())

app.use("/api",appRoute)


const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log(`server on port ${PORT}`);
})