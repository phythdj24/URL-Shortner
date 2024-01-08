const express = require("express");

const app = express();
const { connectTomongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const PORT = 8001;

connectTomongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB Connected")
);

app.use(express.json())
app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server Staretd At PORT => ${PORT}`));
