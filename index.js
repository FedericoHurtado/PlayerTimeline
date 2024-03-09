import express from "express";

const PORT = process.env.PORT || 8080;
const app = express();

app.get("/", (req, resp) => {
    resp.json({
            message: "App is running on docker container"
        });
})

app.listen(PORT, () =>{
    console.log(`App is runnning on ${PORT}`);
})