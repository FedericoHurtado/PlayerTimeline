// entry point for backend

// setup API calls
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors());

// routers
const inputRouter = require('./routes/timeline');
app.use("/timeline/", inputRouter);


// which port to listen on 
app.listen(3001, () => {
    console.log("Server running on port 3001"); // function that runs on start up
});