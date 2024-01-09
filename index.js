const express = require("express");

const app = express();
const URL = require("./models/url");
const { connectTomongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const PORT = 8001;

connectTomongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB Connected")
);

app.use(express.json());
app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory:{
          timestamo: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl)
});

app.listen(PORT, () => console.log(`Server Staretd At PORT => ${PORT}`));
