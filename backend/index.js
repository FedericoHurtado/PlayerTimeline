// entry point for backend

// setup API calls
const express = require("express");
const app = express();
const cors = require("cors");
let dotenv = require("dotenv");

dotenv.config({});

app.use(express.json());
app.use(cors());

// routers
const inputRouter = require("./routes/APIRoutes");
const { createDB } = require("./Utils/startup");
app.use("/", inputRouter);

createDB();

// which port to listen on
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT}`); // function that runs on start up
});
