// entry point for backend

// setup API calls
const express = require('express');
const app = express();
app.use(express.json())

// routers
const inputRouter = require('./routes/league');
app.use("/league/", inputRouter);


// which port to listen on 
app.listen(3001, () => {
    console.log("Server running on port 3001"); // function that runs on start up
});